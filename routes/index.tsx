import { Head } from "$fresh/runtime.ts";
import { PageProps } from "https://deno.land/x/fresh@1.1.5/src/server/types.ts";
import { Handlers } from "https://deno.land/x/fresh@1.1.5/src/server/mod.ts";

const url: string = "https://api.coindesk.com/v1/bpi/currentprice.json"

export interface Price {
  time: Time
  disclaimer: string
  chartName: string
  bpi: Bpi
}

export interface Time {
  updated: string
  updatedISO: string
  updateduk: string
}

export interface Bpi {
  USD: Usd
  GBP: Gbp
  EUR: Eur
}

export interface Usd {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export interface Gbp {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export interface Eur {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export const handler: Handlers<Price | null> = {
  async GET(_,ctx){
    const resp = await fetch(url);
    if(resp.status === 200){
      const price:Price = await resp.json();
      return ctx.render(price);
    }
    return ctx.render(null);
  }
}

export default function Home({data}: PageProps<Price|null>) {
  if(!data){
    return <h1>Data is not available</h1>
  }
  return (
    <div style="background-image: url(/bitcoin_bg.jpeg);display:flex;min-height:800px;"> 
      <Head>
        <title>Bitcoin price quoter</title>
      </Head>
      <div class="p-8 mx-auto max-w-screen-md bg-gray-700 h-1/6 mt-24">
        <img
          src="/bitcoin-accept.png"
          width="200px"
          class="mx-auto"
          alt="bitcoin accepter"
        />
        <p class="my-10 text(enter 3xl white)">
          Welcome to Bitcoin Quoter!
        </p>
        <p class="my-10 text(enter 2xl white)">
          USD: ${data.bpi.USD.rate}
        </p>
        <p class="my-10 text(enter 2xl white)">
          EUR: ${data.bpi.EUR.rate}
        </p>
        <p class="my-10 text(enter 2xl white)">
          GBP: ${data.bpi.GBP.rate}
        </p>
        <p class="my-10 text(enter 2xl white)">
          Last Fetched at {data.time.updated}
        </p>
      </div>
    </div>
  );
}
