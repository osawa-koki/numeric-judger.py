import Link from "next/link";
import pages from "../pages";

function Pages() {
  return (
    <div id="Links">
    {
      pages.map((page, index: number) => {
        return (
          <Link key={index} href={page.path}>
            {page.name}
          </Link>
        )
      })
    }
    </div>
  );
};

export default Pages;
