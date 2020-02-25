<template>
  <div class="placeholder">
    <img :src="imageUrl" :title="title" :alt="title" />
  </div>
</template>

<script lang="ts">
/* eslint-disable dot-notation */
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'

@Component({})
class ProductImage extends Vue {
  @Prop(String) imageUrl: string
  @Prop(String) title: string

  // https://res.cloudinary.com/coopsverige/image/upload/387245.tiff
  //         res.cloudinary.com/coopsverige/image/upload/fl_progressive,q_90,c_lpad,g_center,h_222,w_222/352288.jpg
  // https://res.cloudinary.com/coopsverige/image/upload/d_cooponline:missingimage:missing-image.png,fl_progressive,q_90,c_lpad,w_120,h_120/q_auto,f_auto//349012.jpg
  get cloudinaryImg(): string {
    const imageSize = '300'
    const search = '/upload/' // TODO
    const imgId = this.imageUrl
      .substr(this.imageUrl.indexOf(search) + search.length - 1)
      .replace('.tiff', '.jpg') // TODO
    return (
      'https://res.cloudinary.com/coopsverige/image/upload/d_cooponline:missingimage:missing-image.png,fl_progressive,q_90,c_lpad,w_' +
      imageSize +
      ',h_' +
      imageSize +
      '/q_auto,f_auto/' +
      imgId
    )
  }
}
export default ProductImage
</script>
