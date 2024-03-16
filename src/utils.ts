// import { ICoinDetail, ISearchSymbol } from "./binance.interface";

const debounceFunction = (callbackFunc, delay) => {
    let timer = null;
    return (...args) => {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callbackFunc(...args);
        }, delay);
    }
}

// const handleFilteredSymbolList = (searchSymbolData: ISearchSymbol) => {
//     let augmentedCoinsList = [];
//     const {coinsList, searchText, setSearchedSymbolList} = searchSymbolData;

//     if(!searchText) augmentedCoinsList = coinsList?.map(coinDetail => coinDetail?.symbol);
//     const searchedSymbolList = [];
//     coinsList?.map((item) => {
//         if(item?.symbol?.includes(searchText?.toUpperCase())) {
//             searchedSymbolList.push(item.symbol)
//         }
//     })
//     augmentedCoinsList = searchedSymbolList
//     setSearchedSymbolList(() => augmentedCoinsList);
// }


// export const populateCoinListMap = (coinsList:ICoinDetail[], coinListMap: Map<string, ICoinDetail>) => {
//     if(!coinsList?.length) return;
//     coinsList?.forEach(coin => {
//         coinListMap.set(coin.symbol, coin);
//     })
// }

// export const getCoinDetailFromSymbol = (coinListMap:Map<string, ICoinDetail>, symbol:string) => {
//     if(!symbol) return null;
//     if(coinListMap.has(symbol)) return coinListMap.get(symbol);
//     return null;
// }

// export const updateCoinDetail = (coinListMap:Map<string, ICoinDetail>, coinDetail: ICoinDetail) => {
//     if(!coinDetail || !coinListMap) return null;
//     if(coinListMap.has(coinDetail.symbol)) return coinListMap.set(coinDetail.symbol, coinDetail);
// }


// export const debouncedFilteredSymbolList = debounceFunction(handleFilteredSymbolList, 500);


export default debounceFunction