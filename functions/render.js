const axios = require('axios')

exports.handler = async function (event) {
  const { path }= event
  const params = path.split('/').filter(p => p)
  const og = {
    title: 'Lazysky Notion',
    description: '노션 클론 프로젝트입니다!',
    image: '',
  }
  
  if (params[0] === 'workspace' && params[1]) {
    try {
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${params[1]}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'abcde'
        }
      })
  
      const { title, content, poster } = data
      og.title = title
      og.description = content
      og.image = poster
    } catch (error) {
      console.log(error)
    }
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=UTF-8'
    },
    body: /*HTML*/
    `<!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="Notion Clone">
      <meta property="og:title" content="${og.title}">
      <meta property="og:description" content="${og.description}">
      <meta property="og:image" content="${og.image}">
      <meta property="og:url" content="https://google.com/workspaces/${path}">
      <title>${og.title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
      <script defer src="/main.js"></script>
    </head>
    <body>
      <div id="app"></div>
    </body>
    </html>
    `
  }
}
