import SkeletonCard from '@/components/SkeletonCard'

export default {
  title: 'Skeleton',
  component: SkeletonCard
}

export const Card = () => ({
  components: { SkeletonCard },
  template: '<div style="width: 150px; height: 350px;"><skeleton-card /></div>'
})

Card.story = {
  name: 'SkeletonCard'
}
