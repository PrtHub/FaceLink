

const MeetingIdPage = ({params}: {params: {id: string}}) => {
  return (
    <div>Meeting ID: {params.id}</div>
  )
}

export default MeetingIdPage