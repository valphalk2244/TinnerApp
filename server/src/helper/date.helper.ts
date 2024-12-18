export function calculateAge(dateOfBirth: Date): number {
    const today = new Date()

    const birthDate = new Date(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate())
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    let age = currentDate.getFullYear() - birthDate.getFullYear() //อายุ = ปีปัจจุบัน - ปีเกิด

    //Check if this year's birthday has passed.
    const monthDiff = currentDate.getMonth() - birthDate.getMonth()
    const dayDiff = currentDate.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age-- //ถ้ายังไม่ถึงวันเกิด ลบอายุออก 1 ปี
    }

    return age
}











//66162110377-4 ธนภัฏ แจ้งหมื่นไวย