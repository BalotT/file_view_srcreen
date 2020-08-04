<template>
    <div class="file-view" v-if="showView">
        <header>
            <span/>
            <h2>{{imgName}}</h2>
            <span class="el-icon-close icon" @click="close"/>
        </header>
        <main>
            <div :style="[zoom,rotate]" class="basic">
                <preview
                        ref="preview"
                        :imgItem="activeImg">
                </preview>
            </div>
        </main>
        <footer>
            <div class="operations">
                <!-- 放大 -->
                <span class="el-icon-circle-plus-outline" @click="operations('zoomIn')"/>
                <!-- 缩小 -->
                <span class="el-icon-remove-outline" @click="operations('zoomOut')"/>
                <!-- 原图 -->
                <span class="el-icon-view" @click="operations('resetImg')"/>
                <!-- 上一张 -->
                <span class="el-icon-back" @click="operations('prevImg')"/>
                <!-- 下一张 -->
                <span class="el-icon-right" @click="operations('nextImg')"/>
                <!-- 左翻转 -->
                <span class="el-icon-refresh-left" @click="operations('rotateLeft')"/>
                <!-- 右翻转 -->
                <span class="el-icon-refresh-right" @click="operations('rotateRight')"/>
                <!-- 下载 -->
                <span class="el-icon-download" @click="operations('downLoad')" v-if="downLoad"/>
            </div>
            <ul class="small-view-ul">
                <li v-for="(item,index) in fileList" :key="item[dKey]||item.url"
                    :class="{'active-li':index===viewIndex}"
                    @click="changeBigImg(index)">
                    <img v-if="item.type==='image'" :src="item.url" alt="">
                    <img v-if="item.type==='pdf'" src="../../../examples/assets/pdf.png" alt="">
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    import preview from './previewRender'

    export default {
        name: "fileView",
        components: {preview},
        directives: {
            'file-drag': {}
        },
        data() {
            return {
                showView: true,
                zoomRatio: 0,
                rotateRatio: 0
            }
        },
        computed: {
            imgName() {
                return this.fileList[this.viewIndex].name || '';
            },
            activeImg() {
                return this.fileList[this.viewIndex]
            },
            zoom() {
                return {
                    height: `${(1 + this.zoomRatio) * 70}vh`
                };
            },
            rotate() {
                return {
                    transform: `rotate(${this.rotateRatio}deg)`
                }
            }
        },
        methods: {
            operations(param) {
                switch (param) {
                    case 'zoomIn':
                        this.zoomRatio = (this.zoomRatio + 0.3) > 2 ? 2 : (this.zoomRatio + 0.3);
                        break;
                    case 'zoomOut':
                        this.zoomRatio = (this.zoomRatio - 0.3) < -0.6 ? -0.6 : (this.zoomRatio - 0.3);
                        break;
                    case 'resetImg':
                        this.zoomRatio = 0;
                        this.rotateRatio = 0;
                        break;
                    case 'prevImg':
                        this.viewIndex === 0 ? this.viewIndex = this.fileList.length - 1 : this.viewIndex--;
                        break;
                    case 'nextImg':
                        this.viewIndex >= this.fileList.length - 1 ? this.viewIndex = 0 : this.viewIndex++;
                        break;
                    case 'rotateLeft':
                        this.rotateRatio = this.rotateRatio - 90;
                        break;
                    case 'rotateRight':
                        this.rotateRatio = (this.rotateRatio + 90);
                        break;
                    case 'downLoad':
                        this.downLoad(this.activeImg);
                        break;
                }
            },
            changeBigImg(index) {
                this.viewIndex = index;
            },
            close() {
                this.showView = false;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .file-view {
        z-index: 9999;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        color: #fff;
        background-color: rgba(0, 0, 0, .8);

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 6vh;
            position: absolute;
            z-index: 9999;
            width: 98%;
            padding: 0 1%;

            .icon {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                border: 2px solid #fff;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.5s;
                transform: scale(0.8);

                &:hover {
                    transform: rotate(90deg);
                }
            }

        }

        main {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .basic {
                transition: transform 0.8s, height 0.8s;
                position: absolute;
            }

        }

        footer {
            height: 130px;
            width: 100%;
            position: absolute;
            bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .operations {
                user-select: none;
                font-size: 30px;
                display: flex;
                align-items: center;

                span {
                    cursor: pointer;
                    transition: 0.8s;
                    transform: scale(0.8);

                    &:hover {
                        transform: scale(1);
                    }
                }
            }

            .small-view-ul {
                display: flex;

                li {
                    display: flex;
                    width: 100px;
                    overflow: hidden;
                    margin: 0 5px;
                    height: 80px;
                    cursor: pointer;

                    img {
                        width: 100%;
                    }
                }

                .active-li {
                    border: 1px solid white;
                }
            }
        }
    }
</style>
