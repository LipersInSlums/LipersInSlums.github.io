import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type BreadcrumbsArray<T> = [T, ...T[]];

type Props = {
  readonly root?: string;
};

interface Path {
  readonly breadcrumb: string;
  readonly href: string;
}

function Breadcrumbs({ root }: Props) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsArray<Path> | null>(
    null
  );

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath
        .filter((path) => path != "")
        .map((path, i) => {
          return {
            breadcrumb: path,
            href: "/" + linkPath.slice(0, i + 1).join("/"),
          };
        });

      setBreadcrumbs([{ breadcrumb: root || "HOME", href: "/" }, ...pathArray]);
    }
  }, [router, root]);

  if (breadcrumbs != null) {
    const reversed = [...breadcrumbs].reverse();
    const last = reversed[0];
    const rest = reversed.slice(1);

    return (
      <MuiBreadcrumbs separator={">"}>
        {[...rest].reverse().map((path) => {
          return (
            <Link href={path.href} key={path.breadcrumb}>
              {path.breadcrumb}
            </Link>
          );
        })}
        <Typography>{last.breadcrumb}</Typography>
      </MuiBreadcrumbs>
    );
  }
  return <></>;
}

export default Breadcrumbs;
