const { Story } = require('inkjs');
const fs = require('fs');

const json = fs.readFileSync('../story/main.ink.json', 'utf-8');
const story = new Story(json);

story.ChoosePathString('ch01_homecoming');

while (story.canContinue) {
    const text = story.Continue().trim();
    const tags = story.currentTags;
    if (tags && tags.length > 0) {
        console.log('Text:', text);
        console.log('Tags:', tags);
    }
}
