import ethers from 'ethers'

export function decode(rawTransaction: string) {
    const decoded = ethers.utils.RLP.decode(rawTransaction)
    console.log(decoded)
}