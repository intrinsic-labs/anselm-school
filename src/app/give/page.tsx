import GivingSection from '../../components/Giving/GivingPage'
import { getGivingSection } from '../../lib/dataManager'

// Revalidate content every hour (3600 seconds)
export const revalidate = 3600

export default async function Giving() {
  const givingData = await getGivingSection()

  return (
    <main className="min-h-screen flex flex-col">
      {/* Giving Section - Dynamic from Sanity */}
      {givingData && (
        <GivingSection givingSection={givingData} />
      )}
    </main>
  );
}