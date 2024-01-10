import Header from '../components/Header';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';

const Main = () => {
    return (
        <>
            <Container>
                <Header/>

                <CategoriesContainer></CategoriesContainer>
                <MenuContainer></MenuContainer>
            </Container>
            <Footer>
                <FooterContainer>

                </FooterContainer>

            </Footer>
        </>
    );
};

export default Main;
