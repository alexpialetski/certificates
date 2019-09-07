export const addTagClick = (tags, setTags, tag, setTag) => {
    tags.push(tag);
    setTags([...tags]);
    setTag('');
};

export const deleteTagClick = (e, tags, setTags) => {
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] === e.target.value) {
            tags.splice(i, 1);
            break;
        }
    }
    setTags([...tags]);
};
