type ZipcloudResult = {
  zipcode: string | null
  address1: string | null
  address2: string | null
  address3: string | null
}

/**
 * 郵便番号の書式をチェックする（ハイフンなし7桁の数字）
 */
export const validateZipcode = (zipcode: string): boolean => {
  const regex = new RegExp('^[0-9]{7}$')
  return regex.test(zipcode)
}

/**
 * 郵便番号から住所を検索する
 */
export const searchAddressByZipcode = async (zipcode: string): Promise<Array<ZipcloudResult>> => {
  try {
    const resp = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`)
    const { message, results } = await resp.json()
    if (message) {
      throw new Error(message)
    }
    return results
  } catch (err) {
    console.log(err)
    throw err
  }
}
