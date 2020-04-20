import AdCard from '@/components/AdCard'

export default {
  title: 'AdCard',
  component: AdCard
}

const components = { AdCard }

export const saFunkarDet = () => ({
  components,
  data() {
    return {
      card: {
        type: 'ad',
        image: 'https://coop-static.netlify.com/sa-funkar-det.jpg',
        link: '#',
        buttonText: 'Så funkar det'
      }
    }
  },
  template: `
    <div>
      <ad-card style="width: 175px; height: 350px;" :card="card" :columns="3" />
    </div>
  `
})

saFunkarDet.story = {
  name: 'Så funkar det'
}

export const recept = () => ({
  components,
  data() {
    return {
      card: {
        type: 'ad',
        image: 'https://coop-static.netlify.com/recept.jpg',
        link: '#',
        buttonText: 'Recept'
      }
    }
  },
  template: `
    <div>
      <ad-card style="width: 175px; height: 350px;" :card="card" :columns="3" />
    </div>
  `
})

recept.story = {
  name: 'Recept'
}
