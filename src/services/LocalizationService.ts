import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import ILocalizationStrings from '../data/ILocalizationStrings';

class LocalizationService {
    private static data?: LocalizedStringsMethods & ILocalizationStrings;

    static localize = (language: string | undefined = undefined) => {
        if (LocalizationService.data == null || LocalizationService.data === undefined) { // maybe this check helps
            LocalizationService.data = new LocalizedStrings<ILocalizationStrings>({
                it: {
                    telegramGroup: 'Gruppo Telegram',
                    headerMenuItems: {
                        home: 'Home',
                        aboutUs: 'Chi siamo',
                        rules: 'Regolamento',
                        courses: 'Corsi',
                        services: 'Servizi',
                        additionalGroups: 'Gruppi extra',
                        representatives: 'Rappresentanti',
                        contributors: 'Contributori'
                    },
                    settingsPanel: {
                        settings: 'Impostazioni',
                        changeTheme: 'Cambia il tema',
                        darkTheme: 'Modalità scura',
                        lightTheme: 'Modalità chiara',
                        selectLanguage: 'Seleziona la lingua',
                        italian: 'Italiano',
                        english: 'Inglese',
                        selectColor: 'Seleziona il colore principale',
                        close: 'Chiudi'
                    },
                    homepage: {
                        section1: {
                            text1: 'Benvenuto nel sito web del <Text style={{color: theme.palette.themePrimary}} variant="xLarge">Network Studenti UniMi</Text> !',
                            text2: 'La nostra missione è organizzare le informazioni riguardo l\'Università degli studi di Milano e renderle accessibili a tutti.',
                            sliders: [
                                { text1: 'Sei uno studente che vuole immatricolarsi e che cerca un gruppo generale in cui chiedere informazioni', text2: 'Ne abbiamo creato uno apposito!', cardText: "Pre-matricole, ammissioni e immatricolazioni" },
                                { text1: 'Stai cercando un gruppo per trovare un alloggio a Milano insieme ad altri studenti universitari oppure vuoi creare un annuncio', text2: 'Entra nel gruppo apposito!', cardText: 'Alloggi' },
                                { text1: 'Ti ricordiamo che abbiamo a disposizione una <Text styles={semibold}>Wiki</Text> in cui è possibile collaborare e aiutare altri studenti! Puoi trovare tutto il materiale che ti serve, ma ricorda che è importante anche contribuire!', reachWiki: 'Raggiungi la Wiki!' },
                                { text1: 'Per noi offrirti la possibilità di non perdere tempo alla ricerca di servizi universitari è molto importante. Proprio per questo abbiamo realizzato una pagina apposita per trovarli tutti subito, e farti scoprire anche alcune guide che abbiamo realizzato!' }
                            ]
                        },
                        section2: {
                            text: 'I nostri collegamenti principali',
                            card1: {
                                text: 'Unisciti al canale telegram per rimanere aggiornato e raggiungere tutti i link disponibili!',
                                button: 'Canale Telegram'
                            },
                            card2: {
                                text: 'Entra nel gruppo telegram principale per eventuali discussioni e chiarimenti riguardo il network.',
                                button: 'Gruppo Telegram'
                            },
                            card3: {
                                text: 'Entra nel nostro server discord per scambiare informazioni con altri studenti e conoscere nuove persone!',
                                button: 'Server Discord'
                            },
                            card4: {
                                text: 'Trovi tutti i nostri progetti open source nelle repository della nostra organizzazione.',
                                button: 'Organizzazione'
                            }
                        },
                        section3: {
                            text: 'Ogni cosa ha il suo gruppo Telegram',
                            card1: {
                                text: 'Dì addio al mega gruppo WhatsApp in cui non si capisce nulla! Abbiamo creato un gruppo Telegram per ogni insegnamento.',
                                button: 'Gruppi dei corsi'
                            },
                            card2: {
                                text: 'Ripetizioni, materiali, erasmus, tirocinio, alloggi. Tutte quelle cose extra che però hanno la loro importanza.',
                                button: 'Gruppi extra'
                            },
                            card3: {
                                text: "Crediamo che un ambiente rispettoso e inclusivo ci renda più innovativi e produttivi. Dai un'occhiata al regolamento dei gruppi.",
                                button: 'Regolamento'
                            }
                        },
                        section4: {
                            text: 'I nostri servizi per aiutarti nello studio',
                            card1: {
                                text: 'Accedi alla Wiki del Network e aiutaci a migliorarla contribuendo!',
                                button: 'Wiki'
                            },
                            card2: {
                                text: 'Utilizza la nostra comoda pagina che ti permette di raggiungere tutti i servizi UniMi.',
                                button: 'Servizi'
                            },
                            card3: {
                                text: 'Mi mandi i tuoi appunti? Un attimo e sono subito da lei!',
                                button: 'HedgeDoc'
                            },
                            card4: {
                                text: 'Accedi al nostro servizio per condividere codice e qualsiasi altro materiale in maniera comoda e sicura.',
                                button: 'Paste'
                            }
                        },
                        section5: {
                            text: 'Hai provato a spegnere e riaccendere?',
                            card1: {
                                text: 'Ho un problema didattico.',
                                button: 'Rappresentanti'
                            },
                            card2: {
                                text: 'Ho un problema tecnico.',
                                button: 'Amministratori'
                            }
                        },
                        section6: {
                            text: 'Domande frequenti sul Network'
                        },
                        section7: {
                            text: 'Altre informazioni',
                            card1: { text1: 'Abbiamo più di', text2: 'utenti.' },
                            card2: { text1: 'Abbiamo', text2: 'gruppi telegram.' },
                            card3: { text1: 'Copriamo', text2: 'corsi di laurea.' },
                        }
                    },
                    aboutUs: {
                        text1: "Siamo un'organizzazione senza fini di lucro, apolitica, ovvero apartitica, e neutrale, la quale si pone l'obiettivo di offrire servizi telematici agli studenti dell'Università degli Studi di Milano.",
                        button: { text1: 'Statuto', text2: "Dai un'occhiata al nostro statuto!" },
                        header1: 'Coordinatore',
                        header2: 'Comitato Amministrativo',
                        header3: 'Amministratori dei gruppi telegram'
                    },
                    rules: {
                        text1: 'Qui è possibile trovare il regolamento dei gruppi telegram del network. Si consiglia di leggere tutte le regole di cui è composto prima di usare uno qualsiasi di essi.',
                        question: 'Perchè abbiamo introdotto un regolamento?',
                        answer: { text1: 'Vogliamo rendere chiari i motivi per cui abbiamo deciso di regolamentare i gruppi del nostro network.', text2: "Abbiamo notato che la maggior parte di essi erano tempestati di domande banali, fatte più volte al giorno, la cui risposta era facilmente trovabile. Questo riduce la qualità della chat e scoraggia la partecipazione di studenti più attenti. Per questo motivo abbiamo deciso di provare a limitare il fenomeno, da una parte ammonendo chi continua a fare interventi non produttivi, e dall'altra fornendo un modo facile e veloce per trovare le informazioni più importanti tramite la <Link href='https://wiki.studentiunimi.it/' target='_blank'>Wiki</Link>."},
                        text2: 'Regolamento dei gruppi Telegram'
                    },
                    courses: {
                        text1: 'Qui è possibile trovare i gruppi telegram, siti web, wiki, faq (se disponibili) e informazioni generali come il manifesto degli studi riguardo il tuo corso di laurea e i suoi corsi didattici.',
                        text2: "I link alla <Text styles={semibold}>Wiki</Text> di un corso didattico potrebbero portare a pagine non ancora compilate: è qui che potete contribuire iscrivendovi e aiutandoci a raccogliere faq e qualsiasi altro contenuto utile per i corsi didattici. Informatica musicale, per la comunicazione digitale e molti altri corsi di laurea non hanno ancora contenuti! Puoi contribuire <Link href='https://wiki.studentiunimi.it/' target='_blank'>qui</Link> creando un apposito account gratuito.",
                        departmentSelect: 'Seleziona un dipartimento',
                        cdlSelect: 'Seleziona un corso di Laurea',
                        availableRedirects: 'Collegamenti disponibili',
                        availableGroups: 'Gruppo disponibili',
                        availableAdmins: 'Amministratori disponibili',
                        nameFilter: 'Cerca per nome',
                        yearFilter: 'Cerca per anno',
                        semesterFilter: 'Cerca per semestre',
                        year: 'Anno',
                        semester: 'Semestre',
                        complementary: 'Complementare',
                        websites: 'Siti web',
                        mainGroup: 'Gruppo principale',
                        mainGroupDescription: 'Gruppo principale per qualsiasi tipo di discussione inerente al corso di laurea.',
                        groupNotAvailable: 'Gruppo non disponibile.',
                        contactAdmin: "<Icon iconName='FollowUser'/> Contatta un <Link href='https://studentiunimi.it/organization/'>amministratore</Link> se vuoi essere aggiunto al gruppo, oppure chiedilo direttamente sul <Link href='https://t.me/joinchat/jjzrKAOF74s5ZmI0' target='_blank'>gruppo principale</Link>.",
                        groupsNotFound: 'Nessun gruppo trovato.',
                        adminsNotFound: 'Nessun amministratore disponibile.'
                    },
                    services: {
                        text1: 'Siete stanchi di dover andare a spulciare miriadi di pagine che neanche caricano alla ricerca di strumenti e servizi universitari? Abbiamo realizzato una pagina per centralizzarli tutti! Inoltre, qui potete trovare anche alcune guide che abbiamo realizzato.',
                        text2: '<Text styles={semibold}>Attenti:</Text> alcune pagine come Unimia oppure i Servizi SIFA potrebbero non caricare (ovviamente ricordiamo che non è colpa nostra in tal caso!).',
                        text3: "Se pensi che debba essere aggiunto qualche servizio scrivi pure sul <Link href='https://t.me/joinchat/VswKeAblS2nrfXME' target='_blank'>gruppo principale</Link>.",
                        availableServices: 'Servizi e guide disponibili'
                    },
                    extraGroups: {
                        text1: 'Cerchi un gruppo aggiuntivo in particolare? Qui è possibile trovare tutti quelli che abbiamo creato.',
                        text2: "Se vorresti che venissero creati altri gruppi puoi scriverlo sul <Link href='https://t.me/joinchat/VswKeAblS2nrfXME' target='_blank'>gruppo principale</Link>.",
                        text3: 'Stai cercando gruppi riguardanti giochi? Nessun problema!',
                        mug: "Dai un'occhiata all'associazione studentesca <Text styles={semibold} style={{color: theme.palette.themeSecondary}}>MUG</Text> (Milan University Gamers).",
                        availableGroups: 'Gruppi disponibili',
                        extraGroup: 'Gruppo extra'
                    },
                    representatives: {
                        text1: 'Il rappresentante degli studenti è un ruolo molto importante ed altamente formativo, che garantisce a tutti gli studenti universitari un supporto alle difficoltà che può incontrare durante il periodo di studio.',
                        text2: 'Di seguito è presente la lista dei rappresentanti di ogni dipartimento e i loro contatti.',
                        departmentSelect: 'Seleziona un dipartimento'
                    },
                    contributors: {
                        text1:'Di seguito è possibile trovare tutte le persone che hanno contribuito allo sviluppo del sito web, dei servizi che offre, della wiki, e del network in generale.',
                        header1: 'Manutentori principali',
                        header2: 'Contributori',
                        githubProfile: 'Profilo GitHub',
                        websiteProfile: 'Sito Web',
                        text2: 'Hai contribuito allo sviluppo del network e vorresti comparire in questa lista? Scrivi in privato a <Link href="https://t.me/giuseppetm">@giuseppetm</Link>.'
                    },
                    footer: [
                        { text: 'Il network e il relativo sito web non sono affiliati all\'Università degli Studi di Milano.' },
                        { header: 'Link utili' },
                        { header: 'Contatti', text: 'Per qualsiasi dubbio o proposta è possibile scrivere sul <a href="https://t.me/joinchat/VswKeAblS2nrfXME" target="_blank">gruppo principale</a> del network.' },
                    ],
                },











                en: {
                    telegramGroup: 'Telegram Group',
                    headerMenuItems: {
                        home: 'Home',
                        aboutUs: 'About Us',
                        rules: 'Rules',
                        courses: 'Courses',
                        services: 'Services',
                        additionalGroups: 'Extra Groups',
                        representatives: 'Representatives',
                        contributors: 'Contributors'
                    },
                    settingsPanel: {
                        settings: 'Settings',
                        changeTheme: 'Dark Mode',
                        darkTheme: 'On',
                        lightTheme: 'Off',
                        selectLanguage: 'Language',
                        italian: 'Italian',
                        english: 'English',
                        selectColor: 'Select the main color',
                        close: 'Close'
                    },
                    homepage: {
                        section1: {
                            text1: 'Welcome to <Text style={{color: theme.palette.themePrimary}} variant="xLarge">Network Studenti UniMi</Text> !',
                            text2: 'Our goal is to organize all the informations about the University of Milan (Università degli Studi di Milano, Unimi) and make them easily accessible to anyone.',
                            sliders: [
                                { text1: 'Are you a student who wants to matriculate and who is looking for a general group in which to ask for informations ', text2: 'We created one just for this!', cardText: "Pre-students, admissions and enrollments" },
                                { text1: 'Are you looking for a group to find an apartment in Milan together with other university students, or you want to create an ad ', text2: 'Join the dedicated group!', cardText: 'Apartments' },
                                { text1: "We remind you that we have a <Text styles={semibold}>Wiki</Text> where you can collaborate and help other students! You can find all the material you need, but remember that it's also important to contribute!", reachWiki: 'Reach the Wiki!' },
                                { text1: 'For us, offering you the opportunity not to waste time looking for university services is very important. Precisely for this reason we have created a special page to find them all immediately, and also let you discover some guides we have created!' }
                            ]
                        },
                        section2: {
                            text: 'Our main links',
                            card1: {
                                text: 'Join our telegram channel to stay updated and see all the available links!',
                                button: 'Telegram Channel'
                            },
                            card2: {
                                text: 'Join the main telegram group of our networ to discuss.',
                                button: 'Telegram Group'
                            },
                            card3: {
                                text: 'Join our discord to share information and meet new friends!',
                                button: 'Discord Server'
                            },
                            card4: {
                                text: 'Visit the github organization to see all our projects.',
                                button: 'GitHub Organization'
                            }
                        },
                        section3: {
                            text: 'Everything has its own Telegram group chat',
                            card1: {
                                text: 'Say goodbye to those messy WhatsApp chats! We have created a Telegram group for each course.',
                                button: 'Course Groups'
                            },
                            card2: {
                                text: 'Tutoring, course materials, Erasmus, internship, apartments and many other extra things.',
                                button: 'Extra Groups'
                            },
                            card3: {
                                text: 'We think that a respectful and inclusive environment makes us more innovative and efficient. Read the rules!',
                                button: 'Rules'
                            }
                        },
                        section4: {
                            text: 'Our services to help you studying',
                            card1: {
                                text: 'Visit our Wiki and help us improving it!',
                                button: 'Wiki'
                            },
                            card2: {
                                text: 'Use this page to easily reach all the official services provided by UniMi.',
                                button: 'Services'
                            },
                            card3: {
                                text: '“Hey pal, would you mind sharing those notes?”',
                                button: 'HedgeDoc'
                            },
                            card4: {
                                text: 'Our service to safely and easily share your code or any other kind of material.',
                                button: 'PasteBin'
                            }
                        },
                        section5: {
                            text: 'Have you tried turning it off and on again?',
                            card1: {
                                text: 'I have a didactic problem.',
                                button: 'Representatives'
                            },
                            card2: {
                                text: 'I have a technical problem.',
                                button: 'Admins'
                            }
                        },
                        section6: {
                            text: 'Frequently asked questions'
                        },
                        section7: {
                            text: 'Other informations',
                            card1: { text1: 'We have more than', text2: 'users.' },
                            card2: { text1: 'We have', text2: 'telegram groups.' },
                            card3: { text1: 'We cover', text2: 'degree courses.' },
                        }
                    },
                    aboutUs: {
                        text1: 'We are a non-profit organization, neutral and not affiliated to any political party. Our goal is to provide online services to the students at the University of Milan.',
                        button: { text1: 'Statute', text2: "You can read our statute here!" },
                        header1: 'Coordinator',
                        header2: 'Administrative Committee',
                        header3: 'Telegram groups Administrators'
                    },
                    rules: {
                        text1: 'Here you can find the rules of the telegram groups of our network. Please read them before joining any group.',
                        question: 'Why did we create them?',
                        answer: {
                            text1: 'We want to make clear the reasons that took us to introducing these rules into the network.', text2: "We noticed that most of the groups were flooded with trivial questions re-proposed every day. This was lowering the quality of our chats and discouraged the participation of some students. Therefore, we started repressing this phenomenon warning their proponents and offering a dedicated <Link href='https://wiki.studentiunimi.it/start' target='_blank'>Wiki</Link> page for each course." },
                        text2: 'Telegram groups rules',
                        
                        /*
                        rules1: {
                            sectionName: 'Questions and FAQs',
                            rules: [
                                'Question about something indicated on the teacher’s website<br>The user receives a warn and is told where he can find the information. The consequence of 3 warns is a 24h muting. (Exceptions if you are an Erasmus student and you cannot find that information in English).',
                                'Trivial and already addressed questions<br>No punishment if the question is not into the FAQs otherwise the previous rule is applied. It is recommended to look for your question into the chat history before submitting it.',
                            ]
                        },
                        rules2: {
                            sectionName: 'Conduct',
                            rules: [
                                'Blasphemy and trash talking<br>Blasphemy is forbidden and the punishment can be a warn or a ban depending on the situation. Vulgar language is allowed unless it becomes spam. In that case the user will be warned or muted depending on the situation.',
                                'Insults<br>Insults are forbidden. You can criticize a teacher, but you cannot insult him. The punishment can be a warn, a muting or a ban depending on the situation.',
                                'Spam and off-topic<br>Spam is forbidden. Off-topic conversations are also forbidden both in the specific and in the general groups. The punishment can be a warn or a muting depending on the case. If you want to chat freely about anything there is a group with that purpose, you can find it in “Extra groups.',
                            ]
                        },
                        rules3: {
                            sectionName: 'Materials',
                            rules: [
                                'Copyrighted materials<br>Copyrighted material will be canceled from the chat. The user who sent it will be warned and, if he repeats the transgression, eventually banned.',
                                'Accountability<br>The user who sent copyrighted material will be the only responsible for that transgression. The network and its administrators, who are committed to prevent this phenomenon, will not take the responsibility for that action.',
                            ]
                        },
                        rules4: {
                            sectionName: 'More',
                            rules: [
                                'Name and username<br>Users must be identifiable; therefore, you must use your real name or a nickname containing part of it. Regarding the username we suggest keeping it public in order to facilitate the moderation of the network.',
                                'Politics<br>The network and the associated groups are a neutral environment. They do not belong to any party. Whoever will use them for propaganda will be immediately banned from the entire network at the discretion of the administrators.',
                                'Code<br>The code cannot be shared using images or screenshots. If it contains more than 5 lines it must be shared using an appropriate platform like Paste or Gist. On the contrary, if it contains less than 5 lines, you can send it using the specific layout implemented by Telegram. Screenshots of logs, shell and similar are allowed.',
                            ]
                        }
                        */
                    },
                    courses: {
                        text1: 'In this section you can find Telegram groups, websites, wiki, FAQs (if available) and general information about your degree programme and its courses',
                        text2: 'Links to the wiki could lead to unfinished or empty pages: that’s why you can help us collecting FAQs and any other useful material. Many degree courses have no material at this moment! You can help the grow of the network by creating a free account <Link href="https://wiki.studentiunimi.it/start" target="_blank">here</Link> and compile new informations about the courses you followed.',
                        departmentSelect: 'Select the department',
                        cdlSelect: 'Select the degree',
                        availableRedirects: 'Available redirects',
                        availableGroups: 'Available groups',
                        availableAdmins: 'Available admins',
                        nameFilter: 'Search by name',
                        yearFilter: 'Search by year',
                        semesterFilter: 'Search by semester',
                        year: 'Year',
                        semester: 'Semester',
                        complementary: 'Complementary',
                        websites: 'Websites',
                        mainGroup: 'Main group',
                        mainGroupDescription: 'Main group for any type of discussion about this degree.',
                        groupNotAvailable: 'Group not available.',
                        contactAdmin: "<Icon iconName='FollowUser'/> Contact an <Link href='https://studentiunimi.it/organization/'>administrator</Link> if you would like to be added to this group, or ask directly on the <Link href='https://t.me/joinchat/jjzrKAOF74s5ZmI0' target='_blank'>main group</Link>.",
                        groupsNotFound: 'Groups not found.',
                        adminsNotFound: 'There are no admins available.'
                    },
                    services: {
                        text1: 'Tired of surfing into endless pages to find the services offered by the university? We grouped all the links here! We added some guides we created too.',
                        text2: "<Text styles={semibold}>Careful:</Text> some web pages like Unimia or SIFA services might not load (we remind you that it's not our fault in this case!).",
                        text3: 'If you think that something should be added you suggest it on the <Link href="https://t.me/joinchat/VswKeAblS2nrfXME" target="_blank">main group</Link>.',
                        availableServices: 'Available services and guides',
                        /*
                        card1: { header: 'Unimia', text: 'Home Page for all UniMi Services' },
                        card2: { header: 'Sifa', text: 'Legacy Online Services' },
                        card3: { header: 'Students Web Agenda', text: 'Lessons Timetable, Exams Calendar and any kind of Reservations' },
                        card4: { header: 'Exam Registration', text: 'Manage your Registration to your Exams' },
                        card5: { header: 'Webmail', text: 'UniMi Web Mail' },
                        card6: { header: 'Library', text: 'All the information about our libraries' },
                        card7: { header: 'Marks Registeration', text: 'Check, accept or reject the final or partial Results of your Exams' },
                        card8: { header: 'Ariel', text: 'Official Websites Platform for each Courses' },
                        card9: { header: 'InformaStudenti', text: 'Online Student Desk'},
                        */
                    },
                    extraGroups: {
                        text1: 'Looking for something different? Join our additional groups!',
                        text2: 'Would you like to suggest a new group? Bring your request on the <Link href="https://t.me/joinchat/VswKeAblS2nrfXME" target="_blank">main group</Link>.',
                        text3: 'Are you looking for telegram groups about games? No problem!',
                        mug: "Take a look at the university association <Text styles={semibold} style={{color: theme.palette.themeSecondary}}>MUG</Text> (Milan University Gamers).",
                        availableGroups: 'Available groups',
                        extraGroup: 'Extra group'
                    },
                    representatives: {
                        text1: 'Being a students representative is a very important role and a formative experience. They provide a support to any student against all the difficulties during the study period.',
                        text2: 'The list below reports all the representatives of each department and their contacts.',
                        departmentSelect: 'Select your department'
                    },
                    contributors: {
                        text1:'In this section you can find the contributors who have worked into the development of the Network, the website and all its services.',
                        header1: 'Main maintainers',
                        header2: 'Contributors',
                        /*
                        dev1: 'Website Developer',
                        dev2: 'Website Technical Designer',
                        */
                        githubProfile: 'Github Profile',
                        websiteProfile: 'Website',
                        text2: 'Did you contributed to the development of the Network and you would like to appear in this list? Send a private message to <Link href="https://t.me/giuseppetm">@giuseppetm</Link>.'
                    },
                    footer: [
                        { text: 'The network and the associated website are not affiliated to the University of Milan.' },
                        { header: 'Useful links' },
                        { header: 'Contacts', text: 'For any question or suggestion you can join the <Link href="https://t.me/joinchat/VswKeAblS2nrfXME" target="_blank">main network group</Link>.' },
                    ]
                }
            })
        }   

        if (language != null) {
            LocalizationService.data.setLanguage(language!);
        }
    }

    static strings = () => {
        return LocalizationService.data!
    }
}

export default LocalizationService