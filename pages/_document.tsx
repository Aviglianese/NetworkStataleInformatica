import { Stylesheet, InjectionMode, resetIds } from '@fluentui/react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

const stylesheet = Stylesheet.getInstance();

stylesheet.setConfig({
    injectionMode: InjectionMode.none,
    namespace: 'server'
});

export default class MyDocument extends Document<{ styleTags: string }> {
    static async getInitialProps(ctx: DocumentContext) {
        const stylesheet = Stylesheet.getInstance();

        stylesheet.setConfig({
            injectionMode: InjectionMode.none,
            namespace: 'server',
        });

        stylesheet.reset();
        resetIds();

        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => <App {...props} />,
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styleTags: stylesheet.getRules(true),
        };
    }

    render() {
        return (
            <Html prefix="og: http://ogp.me/ns#" lang={"it"} translate="no">
                <Head>
                    <style
                        type="text/css"
                        dangerouslySetInnerHTML={{ __html: this.props.styleTags }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    };
};