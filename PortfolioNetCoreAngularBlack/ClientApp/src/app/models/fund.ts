export interface Fund {
  currency: string;
  name: string;
  isinNumber: string;
  management: string;
  focus: string;
  type: string;
  performanceYTD: string;
  performance1Year: string;
  performance3Year: string;
  performance5Year: string;
  performanceFromBeggining: string;
  performanceActualMinus9: string;
  performanceActualMinus8: string;
  performanceActualMinus7: string;
  performanceActualMinus6: string;
  performanceActualMinus5: string;
  performanceActualMinus4: string;
  performanceActualMinus3: string;
  performanceActualMinus2: string;
  performanceActualMinus1: string;
  performanceAverage: string;

  url: string;

  volatilityArray: string[];
  sharpRateArray: string[];
  bestMonthArray: string[];
  worstMonthArray: string[];
  maxLossArray: string[];
  overFulFilmentArray: string[];

  volatilityString: string;
  sharpRateString: string;
  bestMonthString: string;
  worstMonthString: string;
  maxLossString: string;
  overFulFilmentString: string;

  monthlyPerformanceList: MonthlyPerformance[];

}

export interface MonthlyPerformance {
  year: string;
  performanceListByMonth: number[];
  performance : number;
}
