'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface CryptoCardProps {
  name: string
  symbol: string
  image: string
  currentPrice: number
  priceChangePercentage: number
  volume?: number
  marketCap?: number
  index: number
}

export function CryptoCard({
  name,
  symbol,
  image,
  currentPrice,
  priceChangePercentage,
  volume,
  marketCap,
  index
}: CryptoCardProps) {
  const isPositive = priceChangePercentage >= 0
  const isHighGrowth = priceChangePercentage >= 10

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: isHighGrowth 
          ? '0 0 30px rgba(34, 197, 94, 0.3)' 
          : '0 0 20px rgba(139, 92, 246, 0.2)'
      }}
      className="relative"
    >
      <Card className="relative overflow-hidden border border-gray-800 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-300 group">
        {/* Glow effect for high growth */}
        {isHighGrowth && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-900/50 p-1">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://ui-avatars.com/api/?name=${symbol}&background=1f2937&color=fff&size=48`
                  }}
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                  {name}
                </h3>
                <p className="text-gray-400 text-sm font-mono uppercase">{symbol}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              {isHighGrowth && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  🚀 ALTA
                </Badge>
              )}
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                isPositive 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-bold text-sm">
                  {isPositive ? '+' : ''}{priceChangePercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Preço</span>
              <span className="text-white font-bold text-lg">
                ${currentPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6
                })}
              </span>
            </div>
            
            {volume && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Volume 24h</span>
                <span className="text-gray-300 text-sm">
                  ${(volume / 1000000).toFixed(1)}M
                </span>
              </div>
            )}
            
            {marketCap && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Market Cap</span>
                <span className="text-gray-300 text-sm">
                  ${(marketCap / 1000000).toFixed(1)}M
                </span>
              </div>
            )}
          </div>

          {/* Progress bar for visual representation */}
          <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                isHighGrowth 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : isPositive 
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.abs(priceChangePercentage) * 3, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}