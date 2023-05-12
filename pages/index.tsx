// import Link from 'next/link'
// import Layout from '../components/Layout'

// const IndexPage = () => (
//   <Layout title="Home | Next.js + TypeScript Example">
//     <h1>Hello Next.js 👋</h1>
//     <p>
//       <Link href="/about">About</Link>
//     </p>
//   </Layout>
// )

// export default IndexPage



// getServerSidePropsは、ページがリクエストされるたびにサーバーサイドで実行され、ページのプロパティを返す関数
// NextPageは、ページコンポーネントを表す型
import { GetServerSideProps, NextPage} from "next";
import { useEffect, useState } from "react";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState(initialImageUrl);  // 画像のURLが代入される変数
  const [loading, setLoading] = useState(false);  // APIを呼び出し中かどうかを管理する、初期値は呼び出し中はtrue
  
  // マウント時に画像を読み込む宣言
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);  // 画像URLの状態を更新する
      setLoading(false);          // ローディング状態を更新する
    });
  }, []);
  
  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true);          // 読込中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false);         // 読込中フラグを倒す
  };

  // ローディング中でなければ、画像を表示する
  return (
    <div>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );
};

// Next.jsにページコンポーネントと認識させる
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

// fetchImage関数の戻り値の型
type Image = {
  url: string;
};

// 画像を取得する関数
const fetchImage = async (): Promise<Image> => {
  // asyncキーワードは、その関数（fetchやres.json）が非同期処理を行うことを示す
  // fetchは、HTTPリクエストでリソースを取得するブラウザ標準のAPI
  // 戻り値としてResponseオブジェクトを返す
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  // Responseオブジェクトのjson()メソッドを実行
  // レスポンスのボディーをJSONとしてパースし、JavaScriptのオブジェクトとして取得する
  const images = await res.json();
  console.log(images);
  return images[0];
};
