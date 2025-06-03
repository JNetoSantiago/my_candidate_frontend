import PoliticiansTable from "@/components/politicians-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import UploadModal from "@/components/upload-modal"

import { getPoliticians } from "@/lib/actions/get-politicians"
import { fetchDashboardStats } from "@/lib/actions/fetch-dashboard-stats"

export default async function Page() {

	const politicians = await getPoliticians()
	const stats = await fetchDashboardStats()

	return (
		<div className="flex flex-col min-h-screen">
			<SiteHeader />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<SectionCards stats={stats} />
						<div className="px-4 lg:px-6">
							<PoliticiansTable politicians={politicians} />
						</div>
					</div>
				</div>
			</div>
			<UploadModal isOpen={politicians.length == 0} />
		</div>
	)
}
