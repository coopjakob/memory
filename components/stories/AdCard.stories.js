import AdCard from '@/components/AdCard'

export default {
  title: 'AdCard',
  component: AdCard
}

const generateCard = ({ image, text }) => {
  const output = () => ({
    components: { AdCard },
    data() {
      return {
        card: {
          type: 'ad',
          image,
          link: '#',
          buttonText: text
        }
      }
    },
    template: `<ad-card style="width: 175px; height: 350px;" :card="card" :columns="3" />`
  })
  output.story = {
    name: text
  }
  return output
}

export const matkassar = generateCard({
  image: 'https://coop-static.netlify.com/matkassar.jpg',
  text: 'Matkassar'
})

export const saFunkarDet = generateCard({
  image: 'https://coop-static.netlify.com/sa-funkar-det.jpg',
  text: 'Så funkar det'
})

export const recept = generateCard({
  image: 'https://coop-static.netlify.com/recept.jpg',
  text: 'Recept'
})

export const gardsbutiken = generateCard({
  image:
    'https://www.coop.se/medias/330x704-ny-grid.jpg?context=bWFzdGVyfHJvb3R8OTkxMjl8aW1hZ2UvanBlZ3xoZTcvaDFkLzg5MzQxNDUxOTYwNjIvMzMweDcwNF9ueSBncmlkLmpwZ3wyZmEwMzJhZTc2ZDFlOTQzZGNlMmU4YTRjOTlkZTQ5NTQxMWIyMjVlZjY1NWYwY2Y4ZWY3Y2Q0OWIyZTFjNGRh',
  text: 'Gårdsbutiken'
})
