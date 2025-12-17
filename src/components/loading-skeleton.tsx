'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'

export function CryptoCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-gray-800 bg-black/40 backdrop-blur-xl rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-800" />
          <div>
            <Skeleton className="h-5 w-24 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-16 bg-gray-800" />
          </div>
        </div>
        <Skeleton className="h-8 w-20 rounded-lg bg-gray-800" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-12 bg-gray-800" />
          <Skeleton className="h-5 w-24 bg-gray-800" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20 bg-gray-800" />
          <Skeleton className="h-4 w-16 bg-gray-800" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20 bg-gray-800" />
          <Skeleton className="h-4 w-16 bg-gray-800" />
        </div>
      </div>

      <div className="mt-4">
        <Skeleton className="h-1 w-full bg-gray-800 rounded-full" />
      </div>
    </motion.div>
  )
}

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <CryptoCardSkeleton key={index} />
      ))}
    </div>
  )
}