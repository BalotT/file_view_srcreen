import Vue from 'vue';
import fileView from './fileView'

const fileViewConstructor = Vue.extend(fileView);

const imageType = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];

function fileInit(fileList) {
    return fileList.map(item => {
        return {
            name: item.name || getName(item.url),
            url: item.url,
            type: item.type || getType(item.url)
        }
    })
}

function getType(url) {
    const suffix = url.substr(url.lastIndexOf(".") + 1).toLowerCase();
    if (imageType.indexOf(suffix) !== -1) {
        return "image";
    }
    if (suffix === 'pdf') {
        return "pdf";
    }
    return "";
}

function getName(url) {
    let fileName = url.substr(url.lastIndexOf('/') + 1);
    return fileName.substr(0, fileName.lastIndexOf('.'));
}

/**
 *
 * @param fileList 文件数组
 * @param viewIndex 默认第一个展示文件的index
 * @param downLoad 是否有下载按钮 有的话参数为function 回调参数为当前展示文件对象数据
 * @param dKey 列表展示文件循环绑定的key
 * @returns {{downLoad: *, dKey: string, viewIndex: number, fileList: *}}
 */
export default (fileList = [], viewIndex = 0, downLoad = null, dKey = 'url') => {
    const showFileDom = new fileViewConstructor({
        el: document.createElement('div'),
        data() {
            return {fileList: fileInit(fileList), viewIndex, downLoad, dKey}
        }
    });
    document.body.appendChild(showFileDom.$el);
};

