import contextType from "../component/context/HomePageContext";

export const addTagClick = (tags, setTags, tag, setTag) => {
    tags.push({id: Math.random() * 1000, tag: tag});
    setTags([...tags]);
    setTag('');
};

export const deleteTagClick = (e, tags, setTags) => {
    debugger;
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].tag === e.target.value) {
            tags.splice(i, 1);
            break;
        }
    }
    setTags([...tags]);
};

export const searchTagClick = (e) => {
    contextType.setSearch(contextType.search + ' #' + e.target.value);
};