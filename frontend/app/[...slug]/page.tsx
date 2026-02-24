import { notFound } from "next/navigation";
import { getPage } from "@/lib/cms";
import CmsPageView from "@/components/CmsPageView";

type Props = { params: Promise<{ slug: string[] }> };

export default async function CmsCatchAllPage({ params }: Props) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    notFound();
  }
  const slugStr = slug.join("/");
  const page = await getPage(slugStr);
  if (!page) {
    notFound();
  }
  return <CmsPageView page={page} />;
}
