# Ginger Neo!
Windows版gingerの制作ととスクラップ&ビルドを通じて整理された仕様をweb版に移してより広いユーザーからのフィードバックを受け取れる形にする。gingerは、分散レポジトリ型研究プロトコルGiantのためのUIである。
このReadmeでは、基本的な開発プロセスについて記述する。
# How to get started
この章を読むのかかる時間はおよそ15分です。
## 基本的な流れ：
1. install、テスト実行（→see `install`）
2. 取り組むべき開発単位を見つける（→see `issue`）
3. 開発（→see `development`）
    - ブランチを作成する
    - issueにブランチを紐づける
    - ブランチ内で実装する
4. プルリクエスト（→see ）
5. 2~4の繰り返し（→see ）

## install
まずレポジトリをクローンする。

ターミナル(Terminal)を開き、`zsh`または`bash`のシェルを立ち上げる（windows powershellでも可能とは思うが、のちのgit commandとの相性を考えてこの二つのどちらかを推奨する）。

`npm install`

を実行する。

`npm build`

`npm start`

を続けて実行する。`localhost:3000`でテスト実行の結果が表示されるはず。以下の`Getting Started with Create React App`も参照のこと。以降、開発中は`npm start`のみで動く。
## issue
本プロジェクトは機能単位の分散開発で進める。本ページ(github)の上のIssuesタブから選ぶか、新規に作成する。各issueは機能単位に対応している。issuesを新規に作成するときは以下の点を守る。
- 既存のissuesと重複がないこと
- 各issueを機能単位に対応させること
- issueにはわかりやすく過不足のないタイトルをつけること

issue内の記録は各自の自由なので、なんでもメモったらよろしい。また、時間が割けない、手に負えない、開発単位が大きすぎるなどの理由で一つのissueを一人で最後まで作り終えることは難しいかもしれない。そのときは、開発中のブランチ名（後述）を明示して、 @ でユーザーをメンションし、開発を引き継ぐ人を提案する。また、規模に応じてissueに分割しておく。

## development
### 開発の基本構成
webアプリ開発の最初のつまづきどころとして、ライブラリやフレームワークが多すぎて、全体像が見えないことがある。だが、常にトレンドは移り変わり、決定的なものが存在しないため、フレームワーク群の全体像やグルーピングを図示したものは作られていない。したがって、基本構成についても参考になるページはない。機能別フレームワークのまとめと理解について参考になるページとして、[StateofJS](https://2022.stateofjs.com/ja-JP/libraries/)がある。
また、javascriptの実践的な知識については、[JavaScriptの概念たち](https://qiita.com/tsin1rou/items/90576b6c00b895478610)なども役に立つかもしれない。

フレームワークの組み合わせそれぞれにベストプラクティスがあり、学習の妨げになるため、本開発で使用する構成をあらかじめ決めた上で、それらのみに絞って詳述する。参考程度に、近い機能を果たす類似のフレームワークを比較対象にのせた。

なお、特にコンポーネントの共通化や、スタイルの分離についての規則は、実際の開発の中で徐々に策定していくこととする。
- 使用言語: Typescript(一部Javascript, HTML, CSS)
- フロントエンド
    - TypeScriptフレームワーク: [React](https://ja.react.dev/blog/2023/03/16/introducing-react-dev)（比較対象 Vue, Next, Nuxt）
    - UIフレームワーク: [Material UI](https://mui.com/material-ui/getting-started/)。MUIのそもそもは[こちら](https://codezine.jp/article/detail/14322)など。MUIを使ったデザインには[凝ったもの](https://www.taskade.com/)や[デフォルト](https://codesandbox.io/s/react-material-ui-0yqeo)のものがある。
- バックエンド: FireBase
- その他の主要なライブラリ:
    - [Babel](https://babeljs.io/docs/) モダンjavascript(ECMA2015以降)のブラウザに対する後方互換性を保つためのライブラリ
    - [Webpack](https://webpack.js.org/concepts/) ビルドの時に使う。フレームワークを利用して作ったアプリを、javascript, HTML, CSSに分解するライブラリ。
    - BabelとWebpackについては、[CommonJSとECMA Scirptの違い](https://qiita.com/teradonburi/items/a0095b8c8dfd876d6b91)も参考になる。

本開発で使わない予定のもの（主に全体の開発効率の向上よりも学習コストの削減を優先しているため）
- テンプレートエンジン: pug(Jade), EJS（Embedded JavaScript）
- CSSフレームワーク: ReactBootstrap, Vanilla, TailwindCSSなど
- 今後適宜追記

Tips(Terminalで実行): 
`tree -I node_modules`: 現在のディレクトリ構成を表示。`node_modules`ディレクトリはnode package manager(npm)がインストールしたライブラリのソースコード群が入っている。基本的に開発者が直接触ることはないので、treeからshakeしておくとよい。

`npm ls react`: npmの依存関係を表示する。この例では、reactを使っているライブラリを表示する。バージョンの互換性はよくライブラリ間で不整合になることが多く、開発者を悩ませる。npm installした後のエラーメッセージと合わせて、解決の一助となる。

`npm list`: npm経由でインストールしたライブラリの一覧を表示する。

### 開発の流れ
開発を開始する前にブランチを作成し、issueにブランチを紐づける。
[githubのissueページ](https://github.com/Escher-js/ginger_neo/issues?q=is%3Aissue+is%3Aopen)から開発対象のissueを開き、右側のDevelopmentから`Create a Branch`を押して、出てきたコマンドをVSCodeのTerminalで実行する。

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
