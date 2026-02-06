import { useState, useEffect, useCallback } from 'react'

const WelcomeMessage = () => {
    const welcomeText = "Hey, I'm Abu Bokkor! welcome to my"
    const portfolioText = "portfolio."
    const [weights, setWeights] = useState(Array(welcomeText.length).fill(100))
    const [portfolioWeights, setPortfolioWeights] = useState(Array(portfolioText.length).fill(100))
    const [isAnimating, setIsAnimating] = useState(false)

    // Animation function that can be triggered on load or hover
    const runAnimation = useCallback(() => {
        if (isAnimating) return
        setIsAnimating(true)

        // Reset weights first
        setWeights(Array(welcomeText.length).fill(100))
        setPortfolioWeights(Array(portfolioText.length).fill(100))

        let currentIndex = 0
        const totalChars = welcomeText.length

        const animateNextChar = () => {
            if (currentIndex < totalChars) {
                setWeights(prev => prev.map((w, i) =>
                    i <= currentIndex ? 100 + Math.sin((currentIndex - i) * 0.5) * 200 : 100
                ))
                currentIndex++
                setTimeout(animateNextChar, 40)
            } else {
                animatePortfolio()
            }
        }

        const animatePortfolio = () => {
            let pIndex = 0
            const animatePortfolioChar = () => {
                if (pIndex < portfolioText.length) {
                    setPortfolioWeights(prev => prev.map((w, i) =>
                        i <= pIndex ? 400 : 100
                    ))
                    pIndex++
                    setTimeout(animatePortfolioChar, 60)
                } else {
                    setIsAnimating(false)
                }
            }
            animatePortfolioChar()
        }

        animateNextChar()
    }, [isAnimating])

    // Run animation on mount
    useEffect(() => {
        setTimeout(runAnimation, 300)
    }, [])

    // Handle hover on individual letters
    const handleLetterHover = (index, isPortfolio = false) => {
        if (isPortfolio) {
            setPortfolioWeights(prev => prev.map((w, i) =>
                i === index ? 700 : w
            ))
        } else {
            setWeights(prev => prev.map((w, i) =>
                i === index ? 400 : w
            ))
        }
    }

    const handleLetterLeave = (index, isPortfolio = false) => {
        if (isPortfolio) {
            setPortfolioWeights(prev => prev.map((w, i) =>
                i === index ? 400 : w
            ))
        } else {
            setWeights(prev => prev.map((w, i) =>
                i === index ? 100 : w
            ))
        }
    }

    return (
        <section id="welcome">
            <div className="small-screen">
                <p>For the best experience, please view this portfolio on a larger screen.</p>
            </div>
            <p
                className="cursor-pointer"
                onClick={runAnimation}
            >
                {welcomeText.split('').map((char, i) => (
                    <span
                        key={i}
                        className="max-sm:text-2xl text-3xl font-georama text-gray-300 transition-all duration-200"
                        style={{ fontVariationSettings: `"wght" ${Math.round(weights[i])}` }}
                        onMouseEnter={() => handleLetterHover(i)}
                        onMouseLeave={() => handleLetterLeave(i)}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </p>
            <h1
                className="mt-7 cursor-pointer"
                onClick={runAnimation}
            >
                {portfolioText.split('').map((char, i) => (
                    <span
                        key={i}
                        className="max-sm:text-7xl text-9xl italic font-georama text-white transition-all duration-200"
                        style={{ fontVariationSettings: `"wght" ${Math.round(portfolioWeights[i])}` }}
                        onMouseEnter={() => handleLetterHover(i, true)}
                        onMouseLeave={() => handleLetterLeave(i, true)}
                    >
                        {char}
                    </span>
                ))}
            </h1>
        </section>
    )
}

export default WelcomeMessage
