import { Container } from 'react-bootstrap';
import Background from '../src/components/Background';

export default function Home(props: any) {
  return (
    <>
      <Background backgroundUri={props.theme?.background}/>
      <Container className='d-flex align-items-center justify-content-center vh-100'>
        <Container className='w-10 justify-content-center d-flex'>
          ola mundo
        </Container>
      </Container>
    </>
  )
}