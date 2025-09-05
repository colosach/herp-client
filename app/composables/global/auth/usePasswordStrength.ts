export default function(state: any): {
  strength: Ref<{ met: boolean; text: string }[]>,
  score: Ref<number>,
  color: Ref<"neutral" | "error" | "warning" | "primary" | "secondary" | "success" | "info" | undefined>,
  text: Ref<string>
} {
  const { t } = useI18n()


  function checkStrength(str: string | null) {
    const requirements = [
      { regex: new RegExp(`.{${LOGIN.SCHEMA_CHAR_LENGTHS.password},}`), 
        text: t('REGISTER.inputs.password.requirements.minLength', { min: LOGIN.SCHEMA_CHAR_LENGTHS.password }) 
      },

      { regex: /\d/, text: t('REGISTER.inputs.password.requirements.requireNumber') },
      { regex: /[a-z]/, text: t('REGISTER.inputs.password.requirements.requireLowercase') },
      { regex: /[A-Z]/, text: t('REGISTER.inputs.password.requirements.requireUppercase') }
    ]

    return requirements.map(req => ({ met: req.regex.test(str ?? ''), text: req.text }))
  }

  const strength = computed(() => checkStrength(state.password))
  const score = computed(() => strength.value.filter(req => req.met).length)
  
  const color = computed(() => {
    if (score.value === 0) return 'neutral'
    if (score.value <= 1) return 'error'
    if (score.value <= 2) return 'warning'
    if (score.value === 3) return 'warning'
    return 'primary'
  })
  
  const text = computed(() => {
    if (score.value === 0) return 'Enter a password'
    if (score.value <= 2) return 'Weak password'
    if (score.value === 3) return 'Medium password'
    return 'Strong password'
  })

  return {
    strength,
    score,
    color,
    text
  }
}