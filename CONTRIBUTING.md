# 記事を投稿する方法

1. Markdownで記事を書く．
  * 記事の先頭にメタデータを書く必要がある．
    * `---` で区切られた範囲に記述する．
    * `title`, `author`, `excerpt`, `date` は必須である．
    * `isDraft: true` を記述するとデプロイされない．
  * HTMLへの変換にはPandocを使っているため，[Pandocの独自構文](https://pandoc.org/MANUAL.html#pandocs-markdown)も使用できる．
  * Pandocが対応しているMarkdown以外の形式を扱いたい場合はメンテナに相談すること．

2. topic branchを切り，`_posts/` にMarkdownで記述された記事を置く．
  * branch名のprefixは`post`とし`/`で区切る．
    * 関連Issueがある場合，Issue番号をprefixに含める．
      * e.g. `post/intro-haskell`, `post23/intro-rust`
  * 必要があれば記事のPreviewを見る．
    * `stack build && stack exec site clean && stack exec site watch`を実行した後，http://localhost:8000 にアクセスすればPreviewが見れる．

3. 記事をcommitし，問題なければpushしてPRを作成する．
  * Commit messageは[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)に準拠する．
  * 記事を投稿する場合，`type`は`posts`とする．
    * e.g. `posts: add a Haskell introduction post`

4. CIが完了次第，レビュアーにレビューしてもらう(OPTIONAL)

5. PRをmasterにmergeする．
  * CIがGithub PagesにDeployしてくれる．

# Wikiの開発へ参加する方法

基本事項は記事を投稿する方法と同様である．

### 注意事項

* Issueを必ず作成する．
* topic branchのprefixを`wip<issue number>`とする．
  * e.g. `wip12/add-katex`
* Commit messageは[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)に準拠する．
* Commitは署名済みであるとなお良い．
* Code ownerにレビューしてもらう．
