import { notFound } from 'next/navigation'
import SinglePropertyPage from '@/components/properties/SinglePropertyPage'
import { mockProperties } from '@/data/mockData'
import { PaymentModal } from "@/components/payment/PaymentModal";
import { VirtualTourViewer } from "@/components/virtual-tour/VirtualTourViewer";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const property = mockProperties.find(p => p.id === id)

  if (!property) {
    notFound()
  }

  return <SinglePropertyPage property={property} />
}