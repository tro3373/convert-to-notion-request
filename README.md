## TODO

- [x] curl_driver test
- [x] curl_driver improve to enable empty string parse for headers
- [x] Build Failed on vercel with git ignored `dist` directory
    - vercel.json を用意せずデフォルトで動作させる
    - 動かなかった vercel.json は以下
        ```
        {
          "version": 2,
          "installCommand": "npm install",
          "buildCommand": "npm run build",
          "outputDirectory": "dist",
          "builds": [
            {
              "src": "dist/index.js",
              "use": "@vercel/node",
              "config": {
                "includeFiles": [
                  "dist/**"
                ]
              }
            }
          ],
          "routes": [
            {
              "src": "/(.*)",
              "dest": "dist/index.js"
            }
          ]
        }
        ```
- [x] Disable listen call in main.js under vercel dev command or under vercel infra
- [x] Add npm run build to vercel builds, and Fix vcs update not work in vercel

## Tips

- VercelのExampleは当てにならない(動かない)
- vercel.json がややこしいので使わない
    - vercel.json で buildCommand やら、buildsやら動作不明すぎて使わない
        - [examples/solutions/node-hello-world](https://github.com/vercel/examples/tree/main/solutions/node-hello-world) から もってきた仕組み使えばOK
        - tsconfigも不要
        - vercel dev で開発して、vercelでデプロイ(またはPushで自動ビルドさせればいい)
    - `vercel dev` は dist配下しか見てない
        - 自動再起動走るけどビルドが毎回必要
    - vercel.json でプロジェクトのビルドはできない
        - たとえば、TSで書いたモジュールをビルドして、dist配下に成果物を配置するような処理を考えたときに、vercel.json でビルド処理を書くことはできない
        - vercel.json はあくまで、vercel上でデプロイするためのビルド設定を書くもので、プロジェクトのビルド設定を書くものではない
        - カスタムビルドを定義する場合は、package.json に `scripts.build` で追加する
            - [How can I add a custom build step to my project?](https://vercel.com/guides/how-can-i-add-a-custom-build-step-to-my-project)
                > Projects on Vercel are built in an Amazon Linux 2 environment and are
                > able to run custom scripts during the build.
                > All that's required is a package.json file at the project root
                > with a scripts.build key like the following:
    - vercel プロジェクトでは express の listen するような処理を書いてはいけない
        - vercelはサーバーレスなので、サーバーを立てるようなコマンドは使えない
            - [Why does npm run start not work on Vercel?](https://vercel.com/guides/npm-run-start-not-working#no-running-servers)
                > No Running Servers
                > If your build command is npm run start, node app.js, nodemon server.js, or similar,
                > it is likely you are trying to start a server for your application.
                > The Vercel platform is serverless and designed for static frontends and
                > Serverless Functions. There is no running server. As a result of this,
                > if you are trying to start a server,
                > you are likely to run into difficulties either with
                > your application not starting, or unexpected behavior.
        - `vercel dev` でも、express の listen してはいけない
            - それでもやりたい場合は、express の listen PORT を 3000以外にする、または、vercel dev にポートを指定する
                - 3000は vercel dev が使うポート
                - vercel dev にポートを指定する
                    - `vercel dev -p 3001`

## Refs

- [Deploy Node API (Express Typescript) on Vercel - DEV Community](https://dev.to/tirthpatel/deploy-node-ts-express-typescript-on-vercel-284h)
- [Node.js Serverless Function – Vercel](https://vercel.com/templates/other/nodejs-serverless-function-express)
- [そのままでは動かない Vercel 公式サンプル Node.js Serverless Functions を動かす](https://zenn.dev/monicle/articles/a0d1a0bac89156)

- [Vercelでできること総まとめ(2023) #JavaScript - Qiita](https://qiita.com/Michinosuke/items/ea911ceb61c2c31ba6aa)
- [Vercel FunctionsでGoのAPIサーバをデプロイする！ #deploy - Qiita](https://qiita.com/Senritsu420/items/3008379d0ff68165e7e6)

