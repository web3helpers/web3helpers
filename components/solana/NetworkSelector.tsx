export const networks = [
  {
    id: 0x1,
    name: "mainnet-beta",
    url: "https://api.mainnet-beta.solana.com"
  },
  {
    id: 0x2,
    name: "testnet",
    url:"https://api.testnet.solana.com"
  },
  {
    id: 0x3,
    name: "devnet",
    url:"https://api.devnet.solana.com"
  },
];

// const NetworkSelecotr = (props: any) => {
//   return (
//     <>
//       <select
//         value={?.id}
//         onChange={(event) => {
//         }}
//         {...props}
//       >
//         {networks.map((n) => (
//           <option value={n.id} key={n.id}>
//             {n.name}
//           </option>
//         ))}
//       </select>
//     </>
//   );
// };

// export default NetworkSelecotr;
