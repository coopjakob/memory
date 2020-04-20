// Can't get this to work

// import { baseCard } from './baseCard'
// import ProductCard from '@/components/ProductCard'

// export default {
//   title: 'ProductCard',
//   component: ProductCard
// }

// const generateCard = ({ text, card = {} }) => () => ({
//   components: { ProductCard },
//   story: {
//     name: text
//   },
//   data() {
//     return {
//       card: {
//         ...baseCard,
//         ...card
//       }
//     }
//   },
//   template: `
//     <div>
//       asdf
//       <div style="width: 175px; height: 350px;" :card="card" />
//     </div>
//   `
// })

// export const basic = generateCard({
//   text: 'Basic'
// })
