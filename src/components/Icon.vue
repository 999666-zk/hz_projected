
<script>
import { h, createVNode } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus';
export default {
  props: ['name', 'size', 'color'],
  render() {
    const { size, color, name } = this;
    return h(
      ElIcon,
      {
        size: size || 16,
        color: color,
      },
      () => createVNode(ElementPlusIconsVue[name]),
    );
  }
}
</script>

<style>

</style>