export interface CoinData {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_1h_in_currency?: number
  price_change_percentage_24h_in_currency?: number
  total_volume: number
  market_cap: number
}

export interface MemeCoin extends CoinData {
  priceChangePercentage: number
}

// Lista de memecoins conhecidas para filtrar
const MEMECOIN_KEYWORDS = [
  'pepe', 'doge', 'shib', 'meme', 'floki', 'baby', 'bonk', 'pepecoin',
  'dogelon', 'samoyed', 'akita', 'hoge', 'moon', 'safe', 'galaxy',
  'rocket', 'elon', 'mars', 'saturn', 'jupiter', 'neutron', 'proton',
  'chad', 'based', 'giga', 'chad', 'wojak', 'apu', 'mog', 'toshi',
  'michi', 'popcat', 'billy', 'andrew', 'brett', 'maga', 'trump',
  'biden', 'harry', 'potter', 'spider', 'iron', 'batman', 'superman'
]

// IDs específicos de memecoins na CoinGecko
const MEMECOIN_IDS = [
  'dogecoin', 'shiba-inu', 'pepe', 'floki', 'bonk', 'dogelon-mars',
  'baby-doge-coin', 'samoyedcoin', 'akita-inu', 'hoge-finance',
  'moonriver', 'safe-moon', 'galaxy-finance', 'rocket-pool',
  'neutron', 'proton', 'based-manga', 'giga-chad', 'wojak-finance',
  'apu-apustaja', 'mog-coin', 'toshi', 'michi', 'popcat', 'billy',
  'andrew-tate', 'brett', 'maga', 'trump', 'harrypotterobamasonic10inu'
]

export class CryptoAPI {
  private static readonly BASE_URL = 'https://api.coingecko.com/api/v3'
  private static readonly DEMO_DATA: MemeCoin[] = [
    {
      id: 'pepe',
      name: 'Pepe',
      symbol: 'PEPE',
      image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696529226',
      current_price: 0.000015234,
      priceChangePercentage: 24.5,
      total_volume: 125000000,
      market_cap: 6500000000
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696502144',
      current_price: 0.385421,
      priceChangePercentage: 12.3,
      total_volume: 890000000,
      market_cap: 55000000000
    },
    {
      id: 'shiba-inu',
      name: 'Shiba Inu',
      symbol: 'SHIB',
      image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png?1696511800',
      current_price: 0.000025432,
      priceChangePercentage: 8.7,
      total_volume: 234000000,
      market_cap: 14900000000
    },
    {
      id: 'floki',
      name: 'FLOKI',
      symbol: 'FLOKI',
      image: 'https://assets.coingecko.com/coins/images/20624/large/floki.png?1696523514',
      current_price: 0.0001423,
      priceChangePercentage: 18.2,
      total_volume: 87000000,
      market_cap: 1370000000
    },
    {
      id: 'bonk',
      name: 'Bonk',
      symbol: 'BONK',
      image: 'https://assets.coingecko.com/coins/images/28524/large/bonk.jpg?1696528266',
      current_price: 0.0000321,
      priceChangePercentage: 15.8,
      total_volume: 156000000,
      market_cap: 2100000000
    }
  ]

  private static isMemeCoin(coin: CoinData): boolean {
    const nameLower = coin.name.toLowerCase()
    const symbolLower = coin.symbol.toLowerCase()
    const idLower = coin.id.toLowerCase()

    // Verificar se está na lista de IDs conhecidos
    if (MEMECOIN_IDS.some(id => idLower.includes(id))) {
      return true
    }

    // Verificar keywords no nome ou símbolo
    return MEMECOIN_KEYWORDS.some(keyword => 
      nameLower.includes(keyword) || symbolLower.includes(keyword)
    )
  }

  private static transformCoinData(coin: CoinData, timeframe: string): MemeCoin {
    let priceChangePercentage = 0

    switch (timeframe) {
      case '1h':
        priceChangePercentage = coin.price_change_percentage_1h_in_currency || 0
        break
      case '4h':
        // Estimar 4h baseado no 1h (multiplicar por 4)
        priceChangePercentage = (coin.price_change_percentage_1h_in_currency || 0) * 4
        break
      case '24h':
        priceChangePercentage = coin.price_change_percentage_24h_in_currency || 0
        break
      default:
        priceChangePercentage = coin.price_change_percentage_24h_in_currency || 0
    }

    return {
      ...coin,
      priceChangePercentage
    }
  }

  static async fetchMemeCoins(timeframe: string = '24h'): Promise<MemeCoin[]> {
    try {
      // Tentar usar a API real
      const response = await fetch(
        `${this.BASE_URL}/coins/markets?vs_currency=usd&order=percent_change_24h_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h`
      )

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data: CoinData[] = await response.json()
      
      // Filtrar apenas memecoins
      const memeCoins = data.filter(coin => this.isMemeCoin(coin))
      
      // Transformar dados baseado no timeframe
      const transformedCoins = memeCoins
        .map(coin => this.transformCoinData(coin, timeframe))
        .filter(coin => coin.priceChangePercentage !== 0) // Remover coins sem variação
        .sort((a, b) => b.priceChangePercentage - a.priceChangePercentage) // Ordenar por maior variação
        .slice(0, 10) // Pegar apenas top 10

      return transformedCoins
    } catch (error) {
      console.warn('Erro ao buscar dados da API, usando dados demo:', error)
      
      // Retornar dados demo com variações diferentes baseadas no timeframe
      return this.DEMO_DATA.map(coin => {
        let variation = coin.priceChangePercentage
        
        if (timeframe === '1h') {
          variation = coin.priceChangePercentage / 24
        } else if (timeframe === '4h') {
          variation = coin.priceChangePercentage / 6
        }

        return {
          ...coin,
          priceChangePercentage: variation + (Math.random() - 0.5) * 5
        }
      }).sort((a, b) => b.priceChangePercentage - a.priceChangePercentage)
    }
  }

  static async searchMemeCoins(query: string): Promise<MemeCoin[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/search?query=${encodeURIComponent(query)}`
      )

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const searchResult = await response.json()
      const coinIds = searchResult.coins.slice(0, 20).map((coin: any) => coin.id)

      if (coinIds.length === 0) return []

      const marketsResponse = await fetch(
        `${this.BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=percent_change_24h_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h,24h`
      )

      if (!marketsResponse.ok) {
        throw new Error('Markets request failed')
      }

      const data: CoinData[] = await marketsResponse.json()
      
      return data
        .filter(coin => this.isMemeCoin(coin))
        .map(coin => this.transformCoinData(coin, '24h'))
        .sort((a, b) => b.priceChangePercentage - a.priceChangePercentage)
    } catch (error) {
      console.warn('Erro na busca:', error)
      return []
    }
  }
}