{-# LANGUAGE OverloadedStrings #-}

module Main where

import Control.Applicative (empty)
import Control.Monad (filterM)
import Data.Functor.Identity (runIdentity)
import Data.Maybe (fromMaybe)
import qualified Data.Text as T
import Hakyll
import qualified Text.Pandoc as Pd

--------------------------------------------------------------------------------
main :: IO ()
main = hakyllWith hakyllConfig $ do
  match "templates/*" $ compile templateCompiler

  match "images/*" $ do
    route idRoute
    compile copyFileCompiler

  match "css/*" $ do
    route idRoute
    compile compressCssCompiler

  match "index.html" $ do
    route idRoute
    compile $ do
      posts <- recentFirst =<< loadAll "posts/**"
      let indexCtx =
            mconcat
              [ listField "posts" postCtx (return posts)
              , defaultContext
              ]

      getResourceBody
        >>= applyAsTemplate indexCtx
        >>= loadAndApplyTemplate defaultTemplate indexCtx
        >>= relativizeUrls

  match "posts/**" $ do
    route postsAndDraftsRoutes
    compile $ do
      let relatedPostCtx = prevPostCtx <> nextPostCtx
          lookupUrl ident = maybe empty (pure . toUrl) =<< getRoute ident
          lookupTitle ident = maybe empty pure =<< getMetadataField ident "title"
          prevPostCtx =
            mconcat
              [ field "prevPostUrl" (getPrevPostField lookupUrl)
              , field "prevPostTitle" (getPrevPostField lookupTitle)
              ]
          nextPostCtx =
            mconcat
              [ field "nextPostUrl" (getNextPostField lookupUrl)
              , field "nextPostTitle" (getNextPostField lookupTitle)
              ]
      let postsCtx =
            mconcat
              [ field "description" createOpenGraphDescription
              , boolField "article" (const True)
              , field "subHeadingContent" createSubHeadingContentForPost
              , relatedPostCtx
              , postCtx
              ]

      pandocCompilerWith
        pandocReaderOptions
        defaultHakyllWriterOptions
        >>= loadAndApplyTemplate postTemplate postsCtx
        >>= saveSnapshot "content"
        >>= loadAndApplyTemplate defaultTemplate postsCtx
        >>= relativizeUrls

--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
  mconcat
    [ dateField "date" "%B %e, %Y"
    , dateField "year" "%Y"
    , defaultContext
    ]

hakyllConfig :: Configuration
hakyllConfig =
  defaultConfiguration
    { destinationDirectory = "public"
    , providerDirectory = "preprocessed-site"
    }

pandocReaderOptions :: Pd.ReaderOptions
pandocReaderOptions =
  defaultHakyllReaderOptions
    { Pd.readerExtensions =
        Pd.enableExtension Pd.Ext_east_asian_line_breaks $
          Pd.enableExtension Pd.Ext_emoji $
            Pd.disableExtension Pd.Ext_citations $
              Pd.readerExtensions defaultHakyllReaderOptions
    }

pandocWriterOptions :: Pd.WriterOptions
pandocWriterOptions =
  defaultHakyllWriterOptions
    { Pd.writerNumberSections = True
    , Pd.writerTableOfContents = True
    , Pd.writerTOCDepth = 2
    , Pd.writerHTMLMathMethod = Pd.KaTeX ""
    , Pd.writerTemplate = Just tocTemplate
    }

tocTemplate :: Pd.Template T.Text
tocTemplate =
  either error id . runIdentity . Pd.compileTemplate "" $
    T.unlines
      [ "<div class=\"toc\"><div class=\"header\">Table of Contents</div>"
      , "$toc$"
      , "</div>"
      , "$body$"
      ]

defaultTemplate :: Identifier
defaultTemplate = "templates/default.html"

postTemplate :: Identifier
postTemplate = "templates/post.html"

-- | Create the description for open graph protocol using body string.
createOpenGraphDescription :: Item a -> Compiler String
createOpenGraphDescription _ = convert . itemBody <$> getResourceBody
 where
  convert = take 200 . escapeHtml . concat . lines

-- | Create the HTML tags for the subheading and "Posted by" lines for a blog post.
createSubHeadingContentForPost :: Item a -> Compiler String
createSubHeadingContentForPost item = do
  let ident = itemIdentifier item
  subHeading <- fromMaybe "" <$> getMetadataField ident "subHeading"
  author <- getMetadataField' ident "author"
  maybePostedBy <- getMetadataField ident "postedBy"
  date <- getMetadataField' ident "date"
  mtags <- getMetadataField ident "tags"
  let subHeadingHtml = "<h2 class=\"subheading\">" ++ subHeading ++ "</h2>"
      postedBy = fromMaybe author maybePostedBy
      postedByHtml = "<span class=\"meta\">Posted by " ++ postedBy ++ " on " ++ date ++ "</span>"
      tagsHtml = maybe "" (\tags -> "<span class=\"meta\">Tags: " ++ tags ++ "</span>") mtags
  return $ subHeadingHtml ++ postedByHtml ++ tagsHtml

isDraftPost :: MonadMetadata m => Identifier -> m Bool
isDraftPost ident = do
  isDraft <- fromMaybe "false" <$> getMetadataField ident "draft"
  return $ isDraft == "true"

postItemIdentifiers :: (MonadMetadata m, MonadFail m) => m [Identifier]
postItemIdentifiers = do
  idents <- filterM (fmap not . isDraftPost) =<< getMatches "posts/**"
  sortRecentFirst idents

lookupPostField :: ([Identifier] -> Maybe Identifier) -> (Identifier -> Compiler a) -> Compiler a
lookupPostField lookupIdent lookupField = do
  itemIdents <- postItemIdentifiers
  let mtargetIdent = lookupIdent itemIdents
  maybe empty lookupField mtargetIdent

getPrevPostField :: (Identifier -> Compiler b) -> Item a -> Compiler b
getPrevPostField lookupField item = do
  let ident = itemIdentifier item
  lookupPostField (\itemIdents -> lookup ident $ zip itemIdents (tail itemIdents)) lookupField

getNextPostField :: (Identifier -> Compiler b) -> Item a -> Compiler b
getNextPostField lookupField item = do
  let ident = itemIdentifier item
  lookupPostField (\itemIdents -> lookup ident $ zip (tail itemIdents) itemIdents) lookupField

-- | If posts have a "draft" metadata, then this changes their output location from "posts/" to "drafts/".
postsAndDraftsRoutes :: Routes
postsAndDraftsRoutes = metadataRoute $ \metadata ->
  case lookupString "draft" metadata of
    Just _ ->
      gsubRoute "posts/" (const "drafts/")
        `composeRoutes` setExtension "html"
    Nothing -> setExtension "html"