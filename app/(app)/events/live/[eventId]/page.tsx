import EventMarketsPage from "@/components/events/live/EventMarketsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return <EventMarketsPage eventId={eventId} />;
}
