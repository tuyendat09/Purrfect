import Element from "@/components/Root/_element/Element";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Element id={id} />;
}
