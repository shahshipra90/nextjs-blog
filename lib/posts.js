import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts'); //process.cwd launches nodejs app

export function getSortedPostData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '') //this finds files with .md extension
        const fullpath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullpath, 'utf8')

        const matterResult = matter(fileContents); //parse filecontents using matter function
                                                   //matterresult holds result of processing data

        return {
            id, 
            ...matterResult.data //with spread operator we are spreading them in new object
                                 //with spread operator we are merging id and matterresult in one object
                                 //using object.assign also we can merge id and materresult
        }
    });
    return allPostsData.sort((a,b) =>{
        if(a.date < b.date){
        return 1;
        }else{
            return -1;
        }    //once the page is loaded when you change any kind in algorithm it does not need to load the whole page, and it is known is hydrating.
    })
}

export function getAllPostId() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            },
        };
    });
}

export async function getPostData(id) {
    const fullpath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullpath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();
    // console.log('All Post IDs:', fileContents);

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
