'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { CryptoCard } from '@/components/crypto-card'
import { LoadingGrid } from '@/components/loading-skeleton'
import { CryptoAPI, MemeCoin } from '@/lib/crypto-api'
import { RefreshCw, TrendingUp, Zap, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [memeCoins, setMemeCoins] = useState<MemeCoin[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTimeframe, setActiveTimeframe] = useState('24h')
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchMemeCoins = async (timeframe: string) => {
    try {
      const coins = await CryptoAPI.fetchMemeCoins(timeframe)
      setMemeCoins(coins)
    } catch (error) {
      console.error('Erro ao buscar memecoins:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
      setLastUpdate(new Date())
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchMemeCoins(activeTimeframe)
  }

  useEffect(() => {
    setLoading(true)
    fetchMemeCoins(activeTimeframe)
  }, [activeTimeframe])

  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case '1h':
        return <Zap className="w-4 h-4" />
      case '4h':
        return <TrendingUp className="w-4 h-4" />
      case '24h':
        return <Flame className="w-4 h-4" />
      default:
        return <TrendingUp className="w-4 h-4" />
    }
  }

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case '1h':
        return '1 Hora'
      case '4h':
        return '4 Horas'
      case '24h':
        return '24 Horas'
      default:
        return '24 Horas'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/40 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg blur-lg opacity-50" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">MemePulse</h1>
                  <p className="text-gray-400 text-sm">Análise de Memecoins em Tempo Real</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Última atualização</p>
                  <p className="text-white text-sm">
                    {lastUpdate.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <Button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 transition-all duration-300"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTimeframe} onValueChange={setActiveTimeframe} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-black/60 backdrop-blur-xl border border-gray-800">
                <TabsTrigger 
                  value="1h" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400 transition-all duration-300"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  1h
                </TabsTrigger>
                <TabsTrigger 
                  value="4h" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400 transition-all duration-300"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  4h
                </TabsTrigger>
                <TabsTrigger 
                  value="24h" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400 transition-all duration-300"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  24h
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              <TabsContent key={activeTimeframe} value={activeTimeframe} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stats Header */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-cyan-400 text-sm font-medium">Top 10</p>
                          <p className="text-white text-2xl font-bold">
                            {getTimeframeLabel(activeTimeframe)}
                          </p>
                        </div>
                        {getTimeframeIcon(activeTimeframe)}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-xl p-6 border border-green-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-400 text-sm font-medium">Maior Alta</p>
                          <p className="text-white text-2xl font-bold">
                            {memeCoins.length > 0 ? `+${memeCoins[0]?.priceChangePercentage.toFixed(2)}%` : '--'}
                          </p>
                        </div>
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-400 text-sm font-medium">Total Analisado</p>
                          <p className="text-white text-2xl font-bold">{memeCoins.length}</p>
                        </div>
                        <Flame className="w-6 h-6 text-purple-400" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Crypto Grid */}
                  {loading ? (
                    <LoadingGrid />
                  ) : memeCoins.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {memeCoins.map((coin, index) => (
                        <CryptoCard
                          key={`${coin.id}-${activeTimeframe}`}
                          name={coin.name}
                          symbol={coin.symbol}
                          image={coin.image}
                          currentPrice={coin.current_price}
                          priceChangePercentage={coin.priceChangePercentage}
                          volume={coin.total_volume}
                          marketCap={coin.market_cap}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-10 h-10 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Nenhuma memecoin encontrada
                      </h3>
                      <p className="text-gray-400">
                        Tente novamente mais tarde ou escolha outro período
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-xl mt-20">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                ⚠️ Este app não é recomendação de investimento. Criptomoedas são ativos de alto risco.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Dados fornecidos pela CoinGecko API
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}