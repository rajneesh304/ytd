const express = require('express');
const ytdl = require('ytdl-core');

app = express();

app.set('view engine', 'ejs');
app.set()

const PORT = 3000;
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/download', async (req, res) => {
    // console.log(req.body);
    const id = req.body.youtubeUrl.split('v=')[1];
    const info = await ytdl.getInfo(req.body.youtubeUrl);

    const downloadable = info.formats.filter((format) => {
        if (format.hasAudio) return 1;
        return 0;
    })

    console.log(downloadable.hasAudio);

    return res.render('download', {
        url: `https://www.youtube.com/embed/${id}`,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})