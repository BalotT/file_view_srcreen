function generation(h, url, type) {
    if (type === "image") {
        return createImage(h, url);
    } else if (type === "pdf") {
        return createPdf(h, url);
    } else {
        return (
            <h3 style="color:#1989fa">
                该文件暂时不支持在线预览
            </h3>
        )
    }
}


function createPdf(h, url) {
    return (<embed style="width: 50vw; height: 90%" src={url} height="100%" type="application/pdf"/>)
}

function createImage(h, url) {
    return (<img src={url} style="height: 90%" alt="image"/>);
}

export default {
    functional: true,
    render(h, ctx) {
        let {url, type} = ctx.props.imgItem;
        return generation(h, url, type);
    }
};
