import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Help from '../src/help/help';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: '30px',
  },
  section: {
    marginBottom: '15px',
    fontSize: '1rem',
    '& p': {
      marginBottom: '12px',
      marginTop: '12px',
    },
    '& p:first-of-type': {
      fontSize: '1.3rem',
      fontWeight: 'bolder',
      paddingLeft: '0px',
    },
    '& ul': {
      listStyle: 'none',
      paddingLeft: '27px',
      '& li': {
        marginBottom: '10px',
      },
    },
  },
}));

const Regulamin = () => {
  const classes = useStyles();

  return (
    <Help current="regulamin" titlePart="Regulamin">
      <Typography variant="h5" component="h1" className={classes.header}>
        Regulamin serwisu
      </Typography>
      <div className={classes.section}>
        <p>1. Postanowienia ogólne</p>
        <p>
          <strong>1.1</strong> Właścicielem i Administratorem www.reklamaswietlna.com jest: Hermes
          Chechłowski Bręk spółka cywilna, ul. Anecińska 14, 03-106 Warszawa, NIP 5242896557 Zwanej
          dalej jako „administrator” lub „usługodawca”.
        </p>
        <p>
          <strong>1.2</strong> Serwis Reklamaswietlna.com dostępny jest pod adresem
          http://www.reklamaswietlna.com
        </p>
        <p>
          <strong>1.3</strong> Niniejszy regulamin określa:
        </p>
        <ul>
          <li> a) warunki korzystania z serwisu;</li>
          <li>b) zasady przyjmowania zleceń;</li>
          <li>c) zasady dotyczące zarządzaniem danymi klienta;</li>
          <li>d) warunki reklamacji;</li>
          <li>e) warunki przyjmowania plików do druku;</li>
          <li>f) odpowiedzialność Reklamaswietlna.com;</li>
        </ul>
      </div>
      <div className={classes.section}>
        <p>2. Warunki korzystania z serwisu www.reklamaswietlna.com</p>
        <p>
          <strong>2.1</strong> Korzystanie z serwisu www.reklamaswietlna.com (zwanego dalej jako
          „Reklamaswietlna.com”) oznacza, że akceptują Państwo niniejszy regulamin i zasady w nim
          zawarte i jednocześnie ustawę o ochronie i przetwarzaniu danych osobowych.
        </p>
        <p>
          <strong>2.2</strong> Z serwisu mogą korzystać wyłącznie osoby posiadające konto w systemie
          Reklamaswietlna.com.
        </p>
        <p>
          <strong>2.3</strong> Aby utworzyć konto w Reklamaswietlna.com należy wypełnić Formularz
          rejestracyjny znajdujący się na stronie www.reklamaswietlna.com.
        </p>
        <p>
          <strong>2.4</strong> Konto danego Klienta w Reklamaswietlna.com może zostać zlikwidowane
          przez administratora w przypadku nie przestrzegania regulaminu lub w przypadku zakończenia
          współpracy z danym klientem.
        </p>
        <p>
          <strong>2.5</strong> Heres Chechłowski Bręk spółka cywilna zastrzega sobie prawo do
          przechowywania danych dotyczących Klienta (dane wprowadzone przy tworzeniu konta) oraz
          wszystkich danych dotyczących zleceń Klienta, którego konto zostało usunięte.
        </p>
        <p>
          <strong>2.6</strong> Dane wprowadzone przez Klienta przy tworzeniu konta w
          Reklamaswietlna.com można zmienić zgłaszając pisemną prośbę na adres
          biuro@printing-solutions.pl
        </p>
      </div>
      <div className={classes.section}>
        <p>3. Zamówienia</p>
        <p>
          <strong>3.1</strong> Zamówień mogą dokonywać jedynie klienci posiadający konto w
          Reklamaswietlna.com. Wypełnienie i wysłanie formularza musi zostać zatwierdzone przez
          Administratora. Czas realizacji usługi jest liczony od momentu akceptacji danych
          niezbędnych do realizacji zamówienia przez usługodawcę. Proces weryfikacji może być
          rozpoczęty po spełnieniu następujących warunków:
          <br />- złożenie zamówienia poprzez serwis www.reklamaswietlna.com
          <br />- dokonanie płatności za pośrednictwem systemu Przelewy24
        </p>
        <p>
          <strong>3.2</strong> Zamówienia w Reklamaswietlna.com można składać 24 godziny na dobę 7
          dni w tygodniu.
        </p>
        <p>
          <strong>3.3</strong> Zlecenia standardowe (zawarte w cenniku) w Reklamaswietlna.com będą
          realizowane zgodnie z terminami przypisanymi do poszczególnych produktów. Terminy
          realizacji zleceń niestandardowych – niezawartych w cenniku Reklamaswietlna.com będą
          ustalane indywidualnie z Klientem.
        </p>
        <p>
          <strong>3.4</strong> Termin realizacji zamówienia. Termin realizacji każdego zlecenia jest
          liczony od momentu akceptacji przez Reklamaswietlna.com danych dostarczonych przez
          klienta. W przypadku zamówień nietypowych Hermes Chechłowski Bręk spółka cywilna zastrzega
          sobie możliwość zmiany terminu realizacji.
        </p>

        <ul>
          <li>
            <strong>3.4.1</strong> Terminy realizacji zamówień w kalkulatorach i cennikach podawane
            są w dniach roboczych. Przez dzień roboczy rozumie się każdy dzień za wyjątkiem sobót,
            niedziel, świąt oraz innych dni wolnych od pracy.
          </li>
          <li>
            <strong>3.4.2</strong> Termin realizacji liczy się od następnego dnia roboczego po
            zaksięgowaniu wpłaty.
          </li>
          <li>
            <strong>3.4.3</strong> Dla zamówień złożonych z więcej niż jednego zlecenia (pracy do
            wykonania), termin realizacji zamówienia jest określony przez zlecenie o najdłuższym
            terminie realizacji.
          </li>
          <li>
            <strong>3.4.4</strong> Zamówienie jest gotowe do odbioru w siedzibie Hermes Chechłowski
            Bręk spółka cywilna lub wysyłki kurierem w terminie określonym w podsumowaniu zamówienia
            oraz w e-mailu z potwierdzeniem rejestracji zamówienia.
          </li>
          <li>
            <strong>3.4.5</strong> Terminy realizacji zamówień lub jednego ze zleceń występujących w
            zamówieniu mogą być niedotrzymane ze strony Hermes Chechłowski Bręk spółka cywilna w
            przypadku wystąpienia siły wyższej (np. awaria). W takim jednak przypadku Klient jest o
            tym fakcie informowany najpóźniej w dniu maksymalnego terminu realizacji.
          </li>
          <li>
            <strong>3.4.6</strong> Czas dostarczenia przesyłki wynosi zazwyczaj 1-2 dni robocze. Za
            terminowość dostaw odpowiada firma kurierska realizująca przesyłkę. Przyjęcie towaru z
            późniejszym terminem realizacji na magazyn wysyłkowy nie jest równoznaczne z jego
            wysyłką w tym samym dniu.
          </li>
          <li>
            <strong>3.4.7</strong> W wypadku zrealizowania dwóch lub więcej zamówień w tym samym
            terminie (pochodzących od tego samego Klienta, z tym samym adresem wysyłkowym) Hermes
            Chechłowski Bręk spółka cywilna może podjąć decyzję o zapakowaniu ich do jednej
            przesyłki w celu ograniczenia kosztów dostawy.
          </li>
        </ul>

        <p>
          <strong>3.5</strong> Anulowanie zlecenia w całości opłaconego przelewem obciążone jest
          opłatą z tytułu kosztów administracyjnych w wysokości: do 24 godzin-30zł netto, od 24 do
          72 godzin-25% zwartości zamówienia, od 4 do 5 dni-75% wartości zamówienia (nie mniej niż
          150 zł netto). Zwrot za anulowane zlecenie zostanie pomniejszony o tą kwotę.
        </p>
        <p>
          <strong>3.6</strong> Zamówienia:
          <br />- nieopłacone,
          <br />- nieprzekazane do realizacji,
          <br />- odrzucone i nie wznowione,
          <br />
          starsze niż 30 dni będą automatycznie usuwane.
        </p>
      </div>
      <div className={classes.section}>
        <p>4. Reklamacje</p>
        <p>
          <strong>4.1</strong> Reklamację może złożyć każdy klient zalogowany w Reklamaswietlna.com,
          posiadający konto i zrealizowane zamówienie. Reklamacje można złożyć za pośrednictwem
          Reklamaswietlna.com logując się na swoje konto. Wszelkie inne uwagi dotyczące
          reklamowanego zamówienia można przesyłać na adres biuro@printing-solutions.pl
        </p>
        <p>
          <strong>4.2</strong> Warunki zgłoszenia reklamacji:
        </p>

        <ul>
          <li>
            <strong>4.2.1</strong>Zgłaszając reklamację klient winien jest zawsze posługiwać się
            loginem uzyskanym przy rejestracji w Reklamaswietlna.com, numerem faktury VAT i
            zlecenia, które chce zareklamować.
          </li>
          <li>
            <strong>4.2.2</strong> Każda reklamacja powinna zawierać dokładny opis niezgodności.
            Zdjęcia uszkodzenia prosimy przesłać na adres biuro@printing-solutions.pl
          </li>
          <li>
            <strong>4.2.3</strong> W przypadku zgłoszenia za pośrednictwem Reklamaswietlna.com
            niezbędne jest uzupełnienie odpowiednich informacji w Formularzu Reklamacyjnym oraz opis
            niezgodności. Reklamacje nie spełniające tych kryteriów nie będą rozpatrywane.
          </li>
          <li>
            <strong>4.2.4 </strong>Każda reklamacja zgłoszona przez Klienta i spełniająca powyższe
            warunki będzie rozpatrywana indywidualnie.
          </li>
          <li>
            <strong>4.2.5</strong> Terminy zgłoszenia reklamacji Reklamacje można złożyć do 7 dni od
            momentu dostawy. Po tym czasie reklamacja danej usługi nie będzie rozpatrywana.
          </li>
          <li>
            <strong>4.2.6</strong> Zgłoszenia reklamacji przyjmowane są w dni robocze do godz.
            16:00.
          </li>
          <li>
            <strong>4.2.7</strong> Reklamacje bez względu na rodzaj zgłoszenia będą rozpatrywane w
            ciągu 2 dni roboczych licząc od momentu zgłoszenia. Reklamacje należy złożyć za
            pośrednictwem serwisu Reklamaswietlna.com logując się na swoje konto.
          </li>
        </ul>

        <p>
          <strong>4.3</strong> Warunki składania reklamacji na przesyłki:
        </p>
        <ul>
          <li>
            <strong>4.3.1</strong> Widoczne uszkodzenie lub częściowa utrata towaru
            <br />- Zastrzeżenie należy odnotować na dokumencie przewozowym natychmiast po
            otrzymaniu towaru oraz sporządzić protokół szkodowy w obecności przewoźnika. Zgłoszenia
            reklamacyjne należy zgłaszać pisemnie w ciągu 5 dni od dnia przyjęcia przesyłki. W
            przypadku uszkodzenia przesyłki, Odbiorca zobowiązany jest do jej pozostawienia do
            dyspozycji Hermes Chechłowski Bręk spółka cywilna do czasu zakończenia postępowania
            reklamacyjnego.
            <br />- Reklamacja wniesiona po upływie 7 dni od daty przyjęcia przesyłki bez
            zastrzeżeń, powoduje wygaśnięcie roszczeń.
          </li>
          <li>
            <strong>4.3.2</strong> Opóźnienie w doręczeniu przesyłki: - Odbiorca musi zaznaczyć ten
            fakt na liście przewozowym w obecności przedstawiciela firmy kurierskiej. Wymagane jest
            podanie daty i godziny doręczenia oraz przyczyny opóźnienia doręczenia przesyłki (podana
            przez przedstawiciela firmy kurierskiej). W przypadku udokumentowanej odmowy przyjęcia
            przesyłki przez Odbiorcę przesyłka jest zwracana do Hermes Chechłowski Bręk spółka
            cywilna na koszt Odbiorcy.
            <br />- Przesyłkę, która nie nadeszła do miejsca przeznaczenia wskazanego w liście
            przewozowym w ciągu 30 dni od upływu przewidywanego terminu wykonania usługi, uważa się
            za utraconą.
            <br />- Reklamacje z tytułu niewykonania lub nienależytego wykonania umowy o świadczenie
            Usług i Usług dodatkowych może składać do firm kurierskich wyłącznie Hermes Chechłowski
            Bręk spółka cywilna. Reklamacje należy składać na piśmie w terminie 7 dni.
          </li>
        </ul>
      </div>
      <div className={classes.section}>
        <p>5. Materiały do druku</p>
        <p>
          <strong>5.1</strong> Hermes Chechłowski Bręk spółka cywilna nie odpowiada za treści
          zawarte w pracach przesłanych przez Klienta. Jeśli materiały zawierają treści niezgodne z
          prawem, Hermes Chechłowski Bręk spółka cywilna może odmówić drukowania takich materiałów.
        </p>
        <p>
          <strong>5.2</strong> Hermes Chechłowski Bręk spółka cywilna nie dokonuje korekty (treści)
          w materiałach przesłanych przez klienta
        </p>
        <p>
          <strong>5.3</strong> Materiały przesłane do druku powinny być przygotowane według
          specyfikacji: Pliki graficzne - przygotowanie Hermes Chechłowski Bręk spółka cywilna NIE
          PONOSI odpowiedzialności za źle przygotowane lub niezgodne ze specyfikacją materiały oraz
          wynikające z tego tytułu błędy w druku.
        </p>
        <p>
          <strong>5.4</strong> Wszystkie dokonywane przez Hermes Chechłowski Bręk spółka cywilna
          korekty prac są przesyłane do Klienta celem akceptacji. Czas realizacji pracy w takim
          przypadku liczony jest od momentu otrzymania od Klienta akceptacji drogą mailową.
        </p>
        <p>
          <strong>5.5</strong>. Hermes Chechłowski Bręk spółka cywilna nie ponosi odpowiedzialności
          za wgrane do systemu pliki graficzne.
        </p>
        <p>
          <strong>5.6</strong> Reklamaswietlna.com nie archiwizuje plików graficznych. Piki na
          serwerze FTP oraz przesłane do zleceń po 30 dniach są usuwane.
        </p>
      </div>
      <div className={classes.section}>
        <p>6. Zakres odpowiedzialności</p>
        <p>
          <strong>6.1</strong> Hermes Chechłowski Bręk spółka cywilna nie ponosi odpowiedzialności
          za:
        </p>
        <ul>
          <li>a) Wydruk prac błędnie przygotowanych pod względem treści</li>
          <li>
            b) Wydruk prac błędnie przygotowanych pod względem technicznym, w których nie były
            dokonywane korekty przez Hermes Chechłowski Bręk spółka cywilna
          </li>
          <li>
            d) Wydruk prac zaakceptowanych przez Klienta, a zawierających błędy techniczne lub
            treściowe
          </li>
          <li>
            e) Opóźnienia w terminie realizacji wynikające z terminu dostarczenia poprawnych danych
            przez Klienta
          </li>
          <li>
            f) Za terminowość przekazywania środków pomiędzy bankiem Klienta a bankiem Hermes
            Chechłowski Bręk spółka cywilna
          </li>
          <li>
            h) Reklamacje dotyczące jakości przesyłek kurierskich będą rozpatrywane tylko i
            wyłącznie po przedstawieniu dokumentów dotyczących szkody (patrz pkt. 4.3 regulaminu)
          </li>
        </ul>
      </div>
      <div className={classes.section}>
        <p>7. Własność intelektualna</p>
        <p>
          Zawartość strony internetowej WWW.REKLAMASWIETLNA.COM jest chroniona przez polskie prawo
          autorskie oraz prawo własności intelektualnej. Prawa do serwisu WWW.REKLAMASWIETLNA.COM
          oraz treści w nim zawartych należą do firmy Hermes Chechłowski Bręk spółka cywilna.
          Wszystkie logotypy, nazwy własne, projekty graficzne, filmy, teksty, formularze, skrypty,
          kody źródłowe, hasła, znaki towarowe, znaki serwisowe należą do serwisu
          WWW.REKLAMASWIETLNA.COM. Pobieranie, kopiowanie, modyfikowanie, reprodukowanie,
          przesyłanie lub dystrybuowanie jakichkolwiek treści ze strony WWW.REKLAMASWIETLNA.COM bez
          zgody właściciela jest ZABRONIONE.
        </p>
      </div>
    </Help>
  );
};

export default Regulamin;
