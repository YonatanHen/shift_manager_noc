class Alert {
    constructor(content, title, time, comments) {
        this.title = title
        this.content = content
        this.time = time
        this.comments = [...comments] // array of comments
    }
}

export default Alert