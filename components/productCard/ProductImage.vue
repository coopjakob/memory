<template>
  <div class="product-image">
    <a :href="url" :title="title">
      <img width="200" height="200" :src="cloudinaryImg" :alt="title" />
    </a>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'

@Component({})
class ProductImage extends Vue {
  @Prop(String) imageUrl: string
  @Prop(String) title: string
  @Prop(String) url: string

  get cloudinaryImg(): string {
    const baseUrl =
      'https://res.cloudinary.com/coopsverige/image/upload/d_cooponline:'
    const imageSize = '300'
    const imgId = this.imageUrl.split('upload/')[1].replace('.tiff', '.jpg')
    const props = [
      'missingimage:missing-image.png',
      'fl_progressive',
      'q_90',
      'c_lpad',
      `w_${imageSize}`,
      `h_${imageSize}`
    ]
    return baseUrl + props.join(',') + '/q_auto,f_auto/' + imgId
  }
}
export default ProductImage
</script>

<style lang="scss" scoped>
.product-image {
  width: 100%;
  margin-bottom: 10px;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
