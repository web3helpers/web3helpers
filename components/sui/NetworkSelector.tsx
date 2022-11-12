export const networks = [
  {
    id: 0x1,
    name: "devnet",
    url: "https://fullnode.devnet.sui.io:443"
  },
  {
    id: 0x1,
    name: "testnet",
    url: "https://fullnode.testnet.sui.io"
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
