<template>
    <div>
        <full-page :options="options">
            <div class="section">
                <div class="box1">
                   section1
                </div>
            </div>
            <div class="section">
                <div class="box2">
                section2
                </div>
            </div>
            <div class="section">
                <div class="box3">
                section3
                </div>
            </div>
        </full-page>
    </div>
</template>
 
<script>
export default {
    name: '',
    data () {
        return {
            options: {
                licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
                afterLoad: this.afterLoad,
                scrollOverflow: true,
                scrollBar: false,
                menu: '#menu',
                // navigation: true,
                // anchors: ['page1', 'page2', 'page3'],
                sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
            }
        }
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
