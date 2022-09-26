import Image from "next/image";
import { Nft } from "alchemy-sdk";
import { formatImageSrc } from "./utils";

interface GridProps {
  nfts: Nft[];
}
const Grid = ({ nfts }: GridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <div
          className="flex flex-col bg-white rounded-lg shadow-md"
          key={nft.tokenId + nft.contract}
        >
          {nft.rawMetadata?.image && (
            <Image
              className="object-cover rounded-t-lg"
              width={160}
              height={160}
              // placeholder="blur"
              unoptimized
              src={formatImageSrc(nft.rawMetadata.image)}
              alt={nft.title}
            />
          )}
          <div className="p-2">{nft.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
