import React from 'react';
import Link from 'next/link';

const Page: React.FC = () => {
    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Welcome to My Counter App</h1>
            <Link href="/counter">
                <a style={{
                    fontSize: '16px',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    borderRadius: '5px'
                }}>Go to Counter</a>
            </Link>
        </div>
    );
};

export default Page;