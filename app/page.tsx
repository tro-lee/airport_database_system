export default function Home() {
  fetch(`${process.env.URL}/api`).then(res => res.json()).then(console.log)

  return (
    <h1>欢迎来到某航空</h1>
  )
}
